import { ICourse, ICourseItem, ICourseLesson } from "domain/core/entities/courseEntity";
import { IFile } from "domain/core/entities/fileEntity";
import { IMedia } from "domain/core/entities/mediaEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesItemsResponse, IGetCourseItemByIdResponse, IGetCoursesItemsResponse } from "domain/core/response/course/courseResponsesEntities";
import { courseItemFromRealmToDocumentData, courseItemRealmDataToEntity, courseLessonRealmDataToEntity, courseRealmDataToEntity } from "domain/mappers/course/realm/courseRealmMapper";
import { fromCreateCourseFailureRealmMapper, fromGetCourseItemsFailureRealmMapper } from "domain/mappers/failures/course/realm/courseRealmFailuresMapper";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "infrastructure/config/firebase/firebase-client";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ICourseItemsRepository from "infrastructure/repositories/course/courseItemsRepository";
import { nanoid } from "nanoid";

export default class CourseItemsRealmDatasource implements ICourseItemsRepository {
  async getCourseItems(obj: { courseId?: string | null; courseLessonId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesItemsResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseItems");

      const coursesItems: ICourseItem[] = [];

      let query = {};

      if (obj.courseId) query = { ...query, courseId: obj.courseId };

      if (obj.courseLessonId) query = { ...query, courseLessonId: obj.courseLessonId };

      if (obj.searchQuery) query = { ...query, title: { $regex: new RegExp("^" + obj.searchQuery.toLowerCase(), "i") } };

      const coursesItemsData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);
      const coursesItemsJSON = JSON.parse(JSON.stringify(coursesItemsData));

      if (coursesItemsJSON.length > 0) {
        await Promise.all(coursesItemsJSON.map(async (courseItemData: any) => {
          const courseItemMap: ICourseItem = courseItemRealmDataToEntity(courseItemData);

          if (courseItemMap.courseLessonId.length > 0) {
            const courseLessonData = await mongo.db(DATABASE_NAME).collection("Lessons").findOne({ _id: courseItemMap.courseLessonId });
            const courseLessonJSON =  JSON.parse(JSON.stringify(courseLessonData));

            const courseLessonMap: ICourseLesson = courseLessonRealmDataToEntity(courseLessonJSON);

            if (courseLessonMap.courseLessonId.length > 0) courseItemMap.courseLesson = courseLessonMap;
          }

          if (courseItemMap.courseId.length > 0) {
            const courseData = await mongo.db(DATABASE_NAME).collection("Courses").findOne({ _id: courseItemMap.courseId });
            const courseJSON =  JSON.parse(JSON.stringify(courseData));

            const courseMap: ICourse = courseRealmDataToEntity(courseJSON);

            if (courseMap.courseId.length > 0) courseItemMap.course = courseMap;
          }

          if (courseItemMap.courseId.length > 0) coursesItems.push(courseItemMap);
        }));
      }

      const coursesItemsTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetCoursesItemsResponse = {
        data: coursesItems,
        metadata: {
          total: coursesItemsTotal,
          limit: obj.limit ?? 999,
        }
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseItemsFailureRealmMapper(exception.error);
    }
  }

  async getCourseItemsCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseItems");

      const coursesCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return coursesCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseItemsFailureRealmMapper(exception.error);
    }
  }

  async getCourseItemById(obj: { courseLessonId: string; courseItemId: string }): Promise<IGetCourseItemByIdResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("CourseItems");

      let courseItem: ICourseItem = {} as ICourseItem;

      const courseItemData = await collection.findOne({ courseLessonId: obj.courseLessonId, _id: obj.courseItemId });

      if (courseItemData) {
        courseItem = courseItemRealmDataToEntity(courseItemData);

        if (courseItem.courseLessonId.length > 0) {
          const courseLessonData = await mongo.db(DATABASE_NAME).collection("Lessons").findOne({ _id: courseItem.courseLessonId });
          const courseLessonJSON =  JSON.parse(JSON.stringify(courseLessonData));

          const courseLessonMap: ICourseLesson = courseLessonRealmDataToEntity(courseLessonJSON);

          if (courseLessonMap.courseLessonId.length > 0) courseItem.courseLesson = courseLessonMap;
        }

        if (courseItem.courseId.length > 0) {
          const courseData = await mongo.db(DATABASE_NAME).collection("Courses").findOne({ _id: courseItem.courseId });
  
          const courseMap: ICourse = courseRealmDataToEntity(courseData);
  
          if (courseMap.courseId.length > 0) courseItem.course = courseMap;
        }
      }

      const response: IGetCourseItemByIdResponse = {
        data: courseItem,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseItemsFailureRealmMapper(exception.error);
    }
  }

  async createCourseItem(obj: { courseItem: ICourseItem }): Promise<ICreateCoursesItemsResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseItems");
      const collectionLessons = mongo.db(DATABASE_NAME).collection("Lessons");
      const collectionCourses = mongo.db(DATABASE_NAME).collection("Courses");

      const courseItemsTotal = await collection.count({ courseId: obj.courseItem.courseId });

      obj.courseItem.courseItemId = nanoid(20);
      obj.courseItem.index = courseItemsTotal + 1;

      let mediaList: IMedia[] = [];

      if (obj.courseItem.mainVideo) {
        if (obj.courseItem.mainVideo.file) {
          const fileRef = ref(storage, `Courses/${obj.courseItem.courseId}/Lessons/${obj.courseItem.courseLessonId}/Items/${obj.courseItem.courseItemId}/main-video-${new Date().getTime()}-${nanoid(11)}`);

          await uploadBytes(fileRef, obj.courseItem.mainVideo.file);
        
          const videoUrl = await getDownloadURL(fileRef);

          obj.courseItem.mainVideoUrl = videoUrl;
        }
      }

      if (obj.courseItem.files && obj.courseItem.files?.length > 0) {
        await Promise.all((obj.courseItem.files.map(async (file: IFile) => {
          const fileRef = ref(storage, `Courses/${obj.courseItem.courseId}/Lessons/${obj.courseItem.courseLessonId}/Items/${obj.courseItem.courseItemId}/file-${new Date().getTime()}${file.name ? `- ${file.name}` : ""}`);

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

      obj.courseItem.mediaList = mediaList;
      obj.courseItem.createdAt = new Date();

      await collection.insertOne(courseItemFromRealmToDocumentData(obj.courseItem));

      await collectionCourses.updateOne(
        { _id: obj.courseItem.courseId },
        { $inc: { items: 1 } }
      );

      await collectionLessons.updateOne(
        { _id: obj.courseItem.courseLessonId },
        { $inc: { items: 1 } }
      );

      const response: ICreateCoursesItemsResponse = {
        data: obj.courseItem,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }

  async editCourseItem(obj: { courseItem: ICourseItem }): Promise<ICourseItem | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseItems");

      obj.courseItem.updatedAt = new Date();

      await collection.updateOne(
        { _id: obj.courseItem.courseItemId },
        { $set: courseItemFromRealmToDocumentData(obj.courseItem) }
      );

      return obj.courseItem;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }
}
