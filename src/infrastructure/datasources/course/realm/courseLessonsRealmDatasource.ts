import { ICourse, ICourseItem, ICourseLesson } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesLessonsResponse, IGetCourseLessonByIdResponse, IGetCoursesLessonsResponse } from "domain/core/response/course/courseResponsesEntities";
import { courseItemRealmDataToEntity, courseLessonFromRealmToDocumentData, courseLessonRealmDataToEntity, courseRealmDataToEntity } from "domain/mappers/course/realm/courseRealmMapper";
import { fromCreateCourseFailureRealmMapper, fromGetCourseLessonsFailureRealmMapper } from "domain/mappers/failures/course/realm/courseRealmFailuresMapper";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ICourseLessonsRepository from "infrastructure/repositories/course/courseLessonsRepository";
import { nanoid } from "nanoid";

export default class CourseLessonsRealmDatasource implements ICourseLessonsRepository {
  async getCourseLessons(obj: { courseId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesLessonsResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Lessons");

      const coursesLessons: ICourseLesson[] = [];

      let query = {};

      if (obj.courseId) query = { ...query, courseId: obj.courseId };

      if (obj.searchQuery) query = { ...query, title: { $regex: new RegExp("^" + obj.searchQuery.toLowerCase(), "i") } };

      const coursesLessonsData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);
      const coursesLessonsJSON = JSON.parse(JSON.stringify(coursesLessonsData));

      if (coursesLessonsJSON.length > 0) {
        await Promise.all(coursesLessonsJSON.map(async (courseLessonData: any) => {
          const courseLessonMap: ICourseLesson = courseLessonRealmDataToEntity(courseLessonData);

          if (courseLessonMap.courseId.length > 0) {
            const courseData = await mongo.db(DATABASE_NAME).collection("Courses").findOne({ _id: courseLessonMap.courseId });
            const courseJSON =  JSON.parse(JSON.stringify(courseData));

            const courseMap: ICourse = courseRealmDataToEntity(courseJSON);

            if (courseMap.courseId.length > 0) courseLessonMap.course = courseMap;
          }

          const coursesItemsData = await mongo.db(DATABASE_NAME).collection("CourseItems").aggregate([
            { $match: { courseId: courseLessonMap.courseId, courseLessonId: courseLessonMap.courseLessonId } },
            { $sort: { index: 1 } },
            { $skip: 0 },
            { $limit: 999 },
          ]);
          const coursesItemsJSON = JSON.parse(JSON.stringify(coursesItemsData));
    
          if (coursesItemsJSON.length > 0) {
            await Promise.all(coursesItemsJSON.map(async (courseItemData: any) => {
              const courseItemMap: ICourseItem = courseItemRealmDataToEntity(courseItemData);
    
              if (courseItemMap.courseItemId.length > 0) courseLessonMap.itemsList?.push(courseItemMap);

              if (courseLessonMap.itemsList) courseLessonMap.itemsList.sort((a, b) => a.index - b.index);
            }));
          }

          if (courseLessonMap.courseId.length > 0) coursesLessons.push(courseLessonMap);
        }));
      }

      const coursesLessonsTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetCoursesLessonsResponse = {
        data: coursesLessons,
        metadata: {
          total: coursesLessonsTotal,
          limit: obj.limit ?? 999,
        }
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseLessonsFailureRealmMapper(exception.error);
    }
  }

  async getCourseLessonsCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Lessons");

      const coursesCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return coursesCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseLessonsFailureRealmMapper(exception.error);
    }
  }

  async getCourseLessonById(obj: { courseId: string; courseLessonId: string }): Promise<IGetCourseLessonByIdResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("Lessons");

      let courseLesson: ICourseLesson = {} as ICourseLesson;

      const courseLessonData = await collection.findOne({ courseId: obj.courseId, _id: obj.courseLessonId });

      if (courseLessonData) {
        courseLesson = courseLessonRealmDataToEntity(courseLessonData);

        if (courseLesson.courseId.length > 0) {
          const courseData = await mongo.db(DATABASE_NAME).collection("Lessons").findOne({ _id: courseLesson.courseId });
  
          const courseMap: ICourse = courseRealmDataToEntity(courseData);
  
          if (courseMap.courseId.length > 0) courseLesson.course = courseMap;
        }

        const coursesItemsData = await mongo.db(DATABASE_NAME).collection("CourseItems").aggregate([
          { $match: {} },
          { $sort: { index: 1 } },
          { $skip: 0 },
          { $limit: 999 },
        ]);
        const coursesItemsJSON = JSON.parse(JSON.stringify(coursesItemsData));
  
        if (coursesItemsJSON.length > 0) {
          await Promise.all(coursesItemsJSON.map(async (courseItemData: any) => {
            const courseItemMap: ICourseItem = courseItemRealmDataToEntity(courseItemData);
  
            if (courseItemMap.courseItemId.length > 0) courseLesson.itemsList?.push(courseItemMap);

            if (courseLesson.itemsList) courseLesson.itemsList.sort((a, b) => a.index - b.index);
          }));
        }
      }

      const response: IGetCourseLessonByIdResponse = {
        data: courseLesson,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseLessonsFailureRealmMapper(exception.error);
    }
  }

  async createCourseLesson(obj: { courseLesson: ICourseLesson }): Promise<ICreateCoursesLessonsResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Lessons");
      const collectionCourses = mongo.db(DATABASE_NAME).collection("Courses");

      const courseLessonsTotal = await collection.count({ courseId: obj.courseLesson.courseId });

      obj.courseLesson.courseLessonId = nanoid(20);
      obj.courseLesson.index = courseLessonsTotal + 1;
      obj.courseLesson.createdAt = new Date();

      await collection.insertOne(courseLessonFromRealmToDocumentData(obj.courseLesson));

      await collectionCourses.updateOne(
        { _id: obj.courseLesson.courseId },
        { $inc: { lessons: 1 } }
      );

      const response: ICreateCoursesLessonsResponse = {
        data: obj.courseLesson,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }

  async editCourseLesson(obj: { courseLesson: ICourseLesson }): Promise<ICourseLesson | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Lessons");

      obj.courseLesson.updatedAt = new Date();

      await collection.updateOne(
        { _id: obj.courseLesson.courseLessonId },
        { $set: courseLessonFromRealmToDocumentData(obj.courseLesson) }
      );

      return obj.courseLesson;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }
}
