import { ITeacher } from "domain/core/entities/teacherEntity";
import { IUser } from "domain/core/entities/userEntity";
import { IDeliverable } from "domain/core/entities/deliverableEntity";
import { IFile } from "domain/core/entities/fileEntity";
import { IMedia } from "domain/core/entities/mediaEntity";
import { ICourse, ICourseTask } from "domain/core/entities/courseEntity";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import { teacherRealmDataToEntity } from "domain/mappers/teacher/realm/teacherRealmMapper";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";
import { deliverableFromRealmToDocumentData, deliverableRealmDataToEntity } from "domain/mappers/deliverable/realm/deliverableRealmMapper";
import { fromCreateDeliverableFailureRealmMapper, fromGetDeliverableByIdFailureRealmMapper, fromGetDeliverablesFailureRealmMapper } from "domain/mappers/failures/deliverable/realm/deliverableRealmFailuresMapper";
import { courseRealmDataToEntity, courseTaskRealmDataToEntity } from "domain/mappers/course/realm/courseRealmMapper";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "infrastructure/config/firebase/firebase-client";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import IDeliverableRepository from "infrastructure/repositories/deliverable/deliverableRepository";
import { nanoid } from "nanoid";

export default class DeliverableRealmDatasource implements IDeliverableRepository {
  async getDeliverables(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<IDeliverable[] | IDeliverableFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Deliverables");

      const deliverables: IDeliverable[] = [];

      const deliverablesData = await collection.aggregate([
        { $match: obj.query },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (deliverablesData.length > 0) {
        await Promise.all(deliverablesData.map(async (deliverableData: any) => {
          const deliverableMap: IDeliverable = deliverableRealmDataToEntity(deliverableData);

          if (deliverableMap.courseId && deliverableMap.courseId.length > 0) {
            const courseData = await mongo.db(DATABASE_NAME).collection("Courses").findOne({ _id: deliverableMap.courseId });

            const courseMap: ICourse = courseRealmDataToEntity(courseData);

            if (courseMap.courseId.length > 0) deliverableMap.course = courseMap;
          }

          if (deliverableMap.courseTaskId && deliverableMap.courseTaskId.length > 0) {
            const courseTaskData = await mongo.db(DATABASE_NAME).collection("CourseTasks").findOne({ _id: deliverableMap.courseTaskId });

            const courseTaskMap: ICourseTask = courseTaskRealmDataToEntity(courseTaskData);

            if (courseTaskMap.courseTaskId.length > 0) deliverableMap.courseTask = courseTaskMap;
          }

          if (deliverableMap.teacherId && deliverableMap.teacherId.length > 0) {
            const teacherData = await mongo.db(DATABASE_NAME).collection("Teachers").findOne({ _id: deliverableMap.teacherId });

            const teacherMap: ITeacher = teacherRealmDataToEntity(teacherData);

            if (teacherMap.teacherId.length > 0) deliverableMap.teacher = teacherMap;
          }

          if (deliverableMap.userId && deliverableMap.userId.length > 0) {
            const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: deliverableMap.userId });

            const userMap: IUser = userRealmDataToEntity(userData);

            if (userMap.userId.length > 0) deliverableMap.user = userMap;
          }
          
          if (deliverableMap.deliverableId.length > 0) deliverables.push(deliverableMap);
        }));
      }

      return deliverables;
    } catch (error) {
      const exception = error as any; 
      return fromGetDeliverablesFailureRealmMapper(exception.error);
    }
  }

  async getDeliverableById(obj: { deliverableId: string }): Promise<IDeliverable | IDeliverableFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Deliverables");

      let deliverable: IDeliverable = {} as IDeliverable;

      const deliverableData = await collection.findOne({ _id: obj.deliverableId });

      if (deliverableData) {
        deliverable = deliverableRealmDataToEntity(deliverableData);

        if (deliverable.courseId && deliverable.courseId.length > 0) {
          const courseData = await mongo.db(DATABASE_NAME).collection("Courses").findOne({ _id: deliverable.courseId });

          const courseMap: ICourse = courseRealmDataToEntity(courseData);

          if (courseMap.courseId.length > 0) deliverable.course = courseMap;
        }

        if (deliverable.courseTaskId && deliverable.courseTaskId.length > 0) {
          const courseTaskData = await mongo.db(DATABASE_NAME).collection("CourseTasks").findOne({ _id: deliverable.courseTaskId });

          const courseTaskMap: ICourseTask = courseTaskRealmDataToEntity(courseTaskData);

          if (courseTaskMap.courseTaskId.length > 0) deliverable.courseTask = courseTaskMap;
        }

        if (deliverable.teacherId && deliverable.teacherId.length > 0) {
          const teacherData = await mongo.db(DATABASE_NAME).collection("Teachers").findOne({ _id: deliverable.teacherId });

          const teacherMap: ITeacher = teacherRealmDataToEntity(teacherData);

          if (teacherMap.teacherId.length > 0) deliverable.teacher = teacherMap;
        }

        if (deliverable.userId && deliverable.userId.length > 0) {
          const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: deliverable.userId });

          const userMap: IUser = userRealmDataToEntity(userData);

          if (userMap.userId.length > 0) deliverable.user = userMap;
        }
      }

      return deliverable;
    } catch (error) {
      const exception = error as any; 
      return fromGetDeliverableByIdFailureRealmMapper(exception.error);
    }
  }

  async getDeliverablesCount(obj: { query?: Object | null; }): Promise<number | IDeliverableFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Deliverables");

      const coursesCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return coursesCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetDeliverablesFailureRealmMapper(exception.error);
    }
  }

  async createDeliverable(obj: { deliverable: IDeliverable }): Promise<IDeliverable | IDeliverableFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Deliverables");

      obj.deliverable.deliverableId = nanoid(30);

      let mediaList: IMedia[] = [];

      if (obj.deliverable.files && obj.deliverable.files?.length > 0) {
        await Promise.all((obj.deliverable.files.map(async (file: IFile) => {
          const fileRef = ref(storage, `Courses/${obj.deliverable.courseId}/Deliverables/${obj.deliverable.deliverableId}/file-${new Date().getTime()}${file.name ? `- ${file.name}` : ""}`);

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

      obj.deliverable.createdAt = new Date();
      obj.deliverable.mediaList = mediaList;

      await collection.insertOne(deliverableFromRealmToDocumentData(obj.deliverable));

      if (obj.deliverable.teacherId) {
        await collection.updateMany(
          { courseTaskId: obj.deliverable.courseTaskId, userId: obj.deliverable.userId, readAt: null, teacherId: null },
          { $set: { readAt: new Date(), updatedAt: new Date() } }
        )
      } else {
        await collection.updateMany(
          { courseTaskId: obj.deliverable.courseTaskId, userId: obj.deliverable.userId, readAt: null, teacherId: { $ne: null } },
          { $set: { readAt: new Date(), updatedAt: new Date() } }
        )
      }

      return obj.deliverable;
    } catch (error) {
      const exception = error as any; 
      return fromCreateDeliverableFailureRealmMapper(exception.error);
    }
  }
}
