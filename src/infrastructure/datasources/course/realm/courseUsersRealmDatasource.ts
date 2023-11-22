import { ICourse, ICourseUser } from "domain/core/entities/courseEntity";
import { ITeacher } from "domain/core/entities/teacherEntity";
import { IUser } from "domain/core/entities/userEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesUsersResponse, IGetCourseUserByIdResponse, IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";
import { courseUserFromRealmToDocumentData, courseUserRealmDataToEntity, courseRealmDataToEntity } from "domain/mappers/course/realm/courseRealmMapper";
import { fromCreateCourseFailureRealmMapper, fromGetCourseUsersFailureRealmMapper } from "domain/mappers/failures/course/realm/courseRealmFailuresMapper";
import { teacherRealmDataToEntity } from "domain/mappers/teacher/realm/teacherRealmMapper";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ICourseUsersRepository from "infrastructure/repositories/course/courseUsersRepository";
import { nanoid } from "nanoid";

export default class CourseUsersRealmDatasource implements ICourseUsersRepository {
  async getCourseUsers(obj: { userId?: string | null; courseId?: string | null; courseLessonId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesUsersResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseUsers");

      const coursesUsers: ICourseUser[] = [];

      let query = {};

      if (obj.userId) query = { ...query, userId: obj.userId };

      if (obj.courseId) query = { ...query, courseId: obj.courseId };

      if (obj.courseLessonId) query = { ...query, courseLessonId: obj.courseLessonId };

      if (obj.searchQuery) query = { ...query, title: { $regex: new RegExp("^" + obj.searchQuery.toLowerCase(), "i") } };

      const coursesUsersData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);
      const coursesUsersJSON = JSON.parse(JSON.stringify(coursesUsersData));

      if (coursesUsersJSON.length > 0) {
        await Promise.all(coursesUsersJSON.map(async (courseUserData: any) => {
          const courseUserMap: ICourseUser = courseUserRealmDataToEntity(courseUserData);

          if (courseUserMap.courseId.length > 0) {
            const courseData = await mongo.db(DATABASE_NAME).collection("Courses").findOne({ _id: courseUserMap.courseId });
            const courseJSON =  JSON.parse(JSON.stringify(courseData));

            const courseMap: ICourse = courseRealmDataToEntity(courseJSON);

            if (courseMap.courseId.length > 0) courseUserMap.course = courseMap;
          }

          if (courseUserMap.userId.length > 0) {
            const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: courseUserMap.userId });
            const userJSON =  JSON.parse(JSON.stringify(userData));

            const userMap: IUser = userRealmDataToEntity(userJSON);

            if (userMap.userId.length > 0) courseUserMap.user = userMap;
          }

          if (courseUserMap.courseId.length > 0) coursesUsers.push(courseUserMap);
        }));
      }

      const coursesUsersTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetCoursesUsersResponse = {
        data: coursesUsers,
        metadata: {
          total: coursesUsersTotal,
          limit: obj.limit ?? 999,
        }
      }

      return response;
    } catch (error) {
      const exception = error as any;
      return fromGetCourseUsersFailureRealmMapper(exception.error);
    }
  }

  async getCourseUsersCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseUsers");

      const coursesCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return coursesCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseUsersFailureRealmMapper(exception.error);
    }
  }

  async getCourseUserById(obj: { userId: string; courseId: string }): Promise<IGetCourseUserByIdResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("Courses");

      let course: ICourse = {} as ICourse;

      const courseData = await collection.findOne({ $or: [ { _id: obj.courseId }, { slug: obj.courseId } ] });

      if (courseData) {
        course = courseRealmDataToEntity(courseData);
        
        if (course.teacherId.length > 0) {
          const teacherData = await mongo.db(DATABASE_NAME).collection("Teachers").findOne({ _id: course.teacherId });
          const teacherJSON = JSON.parse(JSON.stringify(teacherData));
  
          const teacherMap: ITeacher = teacherRealmDataToEntity(teacherJSON);
  
          if (teacherMap.teacherId.length > 0) course.teacher = teacherMap;
        }

        const inShoppingCart = await mongo.db(DATABASE_NAME).collection("ShoppingCarts").count({ userId: obj.userId ?? "", courses: course.courseId });
        
        course.inShoppingCart = inShoppingCart > 0 ? true : false;

        const coursesCount = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ courseId: course.courseId });

        course.students = coursesCount;

       if (obj.userId) {
        const coursesIsBuying = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ userId: obj.userId, courseId: course.courseId });

        if (coursesIsBuying > 0) course.isBuying = true;
       }
      }

      const courseUserData = await mongo.db(DATABASE_NAME).collection("CourseUsers").findOne({ userId: obj.userId, courseId: course.courseId });

      let courseUser: ICourseUser = {} as ICourseUser;

      if (courseUserData) {
        courseUser = courseUserRealmDataToEntity(courseUserData);
        
        courseUser.course = course;
      }

      const response: IGetCourseUserByIdResponse = {
        data: JSON.parse(JSON.stringify(courseUser)),
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseUsersFailureRealmMapper(exception.error);
    }
  }

  async createCourseUser(obj: { courseUser: ICourseUser }): Promise<ICreateCoursesUsersResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CourseUsers");

      obj.courseUser.courseUserId = nanoid(20);
      obj.courseUser.createdAt = new Date();

      await collection.insertOne(courseUserFromRealmToDocumentData(obj.courseUser));

      const response: ICreateCoursesUsersResponse = {
        data: obj.courseUser,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }
}
