import { ICourseTask, ICourseUserTask } from "domain/core/entities/courseEntity";
import { IFile } from "domain/core/entities/fileEntity";
import { IMedia } from "domain/core/entities/mediaEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesTasksResponse, IGetCourseTaskByIdResponse, IGetCoursesTasksResponse, IEditFinishCoursesTasksResponse } from "domain/core/response/course/courseResponsesEntities";
import { courseTaskFromRealmToDocumentData, courseTaskRealmDataToEntity } from "domain/mappers/course/realm/courseRealmMapper";
import { fromCreateCourseFailureRealmMapper, fromGetCourseTasksFailureRealmMapper } from "domain/mappers/failures/course/realm/courseRealmFailuresMapper";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "infrastructure/config/firebase/firebase-client";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ICourseTasksRepository from "infrastructure/repositories/course/courseTasksRepository";
import { nanoid } from "nanoid";

export default class CourseTasksRealmDatasource implements ICourseTasksRepository {
  async getCourseTasks(obj: { courseId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesTasksResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseTasks");

      const coursesTasks: ICourseTask[] = [];

      let query = {};

      if (obj.courseId) query = { ...query, courseId: obj.courseId };

      if (obj.searchQuery) query = { ...query, title: { $regex: new RegExp("^" + obj.searchQuery.toLowerCase(), "i") } };

      const coursesTasksData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);
      const coursesTasksJSON = JSON.parse(JSON.stringify(coursesTasksData));

      if (coursesTasksJSON.length > 0) {
        await Promise.all(coursesTasksJSON.map(async (courseTaskData: any) => {
          const courseTaskMap: ICourseTask = courseTaskRealmDataToEntity(courseTaskData);

          if (courseTaskMap.courseId.length > 0) coursesTasks.push(courseTaskMap);
        }));
      }

      const coursesTasksTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetCoursesTasksResponse = {
        data: coursesTasks,
        metadata: {
          total: coursesTasksTotal,
          limit: obj.limit ?? 999,
        }
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseTasksFailureRealmMapper(exception.error);
    }
  }

  async getCourseTasksCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseTasks");

      const coursesCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return coursesCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseTasksFailureRealmMapper(exception.error);
    }
  }

  async getCourseTaskById(obj: { courseTaskId: string }): Promise<IGetCourseTaskByIdResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("CourseTasks");

      let courseTask: ICourseTask = {} as ICourseTask;

      const courseTaskData = await collection.findOne({ _id: obj.courseTaskId });

      if (courseTaskData) courseTask = courseTaskRealmDataToEntity(courseTaskData);

      const response: IGetCourseTaskByIdResponse = {
        data: courseTask,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseTasksFailureRealmMapper(exception.error);
    }
  }

  async createCourseTask(obj: { courseTask: ICourseTask }): Promise<ICreateCoursesTasksResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseTasks");
      const collectionCourses = mongo.db(DATABASE_NAME).collection("Courses");

      const courseTasksTotal = await collection.count({ courseId: obj.courseTask.courseId });

      obj.courseTask.courseTaskId = nanoid(20);
      obj.courseTask.index = courseTasksTotal + 1;

      let mediaList: IMedia[] = [];

      if (obj.courseTask.files && obj.courseTask.files?.length > 0) {
        await Promise.all((obj.courseTask.files.map(async (file: IFile) => {
          const fileRef = ref(storage, `Courses/${obj.courseTask.courseId}/Tasks/${obj.courseTask.courseTaskId}/file-${new Date().getTime()}${file.name ? `- ${file.name}` : ""}`);

          await uploadBytes(fileRef, file.file);
         
          const pictureUrl = await getDownloadURL(fileRef);

          mediaList.push({
            url: pictureUrl,
            type: file.type ?? "image",
            index: mediaList.length,
            name: file.file.name
          } as IMedia);
        })));
      }

      obj.courseTask.mediaList = mediaList;
      obj.courseTask.createdAt = new Date();

      await collection.insertOne(courseTaskFromRealmToDocumentData(obj.courseTask));

      await collectionCourses.updateOne(
        { _id: obj.courseTask.courseId },
        { $inc: { tasks: 1 } }
      );

      const task: ICourseUserTask = {
        taskId: obj.courseTask.courseTaskId,
        isCompleted: false
      }

      await mongo.db(DATABASE_NAME).collection("CourseUsers").updateMany(
        { courseId: obj.courseTask.courseId, isCompleted: false },
        { $addToSet: { tasks: task } }
      );

      const response: ICreateCoursesTasksResponse = {
        data: obj.courseTask,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }

  async editCourseTask(obj: { courseTask: ICourseTask }): Promise<ICourseTask | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseTasks");

      obj.courseTask.updatedAt = new Date();

      await collection.updateOne(
        { _id: obj.courseTask.courseTaskId },
        { $set: courseTaskFromRealmToDocumentData(obj.courseTask) }
      );

      return obj.courseTask;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }

  async editFinishCourseTask(obj: { courseId: string; courseTaskId: string; userId: string; score: number; note: string }): Promise<IEditFinishCoursesTasksResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseUsers");

      await collection.updateOne(
        { courseId: obj.courseId, userId: obj.userId, "tasks.taskId": obj.courseTaskId },
        { $set: { "tasks.$.score": obj.score, "tasks.$.note": obj.note, "tasks.$.isCompleted": true, "tasks.$.completedAt": new Date() } }
      );

      const tasksPendingCount = await collection.count({ courseId: obj.courseId, userId: obj.userId, "tasks.isCompleted": false });

      if (tasksPendingCount === 0) {
        await collection.updateOne(
          { courseId: obj.courseId, userId: obj.userId },
          { $set: { isCompleted: true, completedAt: new Date() } }
        );
      }

      const editFinishCourseTaskResponse: IEditFinishCoursesTasksResponse = {
        data: null,
        metadata: {}
      }

      return editFinishCourseTaskResponse;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }
}
