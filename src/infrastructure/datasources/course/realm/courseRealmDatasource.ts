import { ICourse, ICourseTag } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { fromCreateCourseFailureRealmMapper, fromEditDisabledCourseFailureRealmMapper, fromGetCourseFailureRealmMapper, fromGetCoursesFailureRealmMapper } from "domain/mappers/failures/course/realm/courseRealmFailuresMapper";
import { courseFromRealmToDocumentData, courseRealmDataToEntity, courseTagRealmDataToEntity } from "domain/mappers/course/realm/courseRealmMapper";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ICourseRepository from "infrastructure/repositories/course/courseRepository";
import { nanoid } from "nanoid";
import { teacherRealmDataToEntity } from "domain/mappers/teacher/realm/teacherRealmMapper";
import { ITeacher } from "domain/core/entities/teacherEntity";
import { ICreateCoursesResponse, IGetCourseByIdResponse, IGetCoursesResponse, IGetCoursesTagResponse } from "domain/core/response/course/courseResponsesEntities";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "infrastructure/config/firebase/firebase-client";
import { IUser } from "domain/core/entities/userEntity";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";

export default class CourseRealmDatasource implements ICourseRepository {
  async getCourses(obj: { userId?: string | null, sort?: Object | null; limit?: number | null; skip?: number | null; teacherId?: string | null; searchQuery?: string | null; minPrice?: number | null; maxPrice?: number | null; minLessons?: number | null; maxLessons?: number | null; minInitCourseDate?: Date | null; maxInitCourseDate?: Date | null; courses?: string[] | null }): Promise<IGetCoursesResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Courses");

      const courses: ICourse[] = [];

      let query = {};

      if (obj.teacherId) query = { ...query, teacherId: obj.teacherId };

      if (obj.minPrice) query = { ...query, price: { $gte: obj.minPrice } };

      if (obj.maxPrice) query = { ...query, price: { $lte: obj.maxPrice } };

      if (obj.minLessons) query = { ...query, lessons: { $gte: obj.minLessons } };

      if (obj.maxLessons) query = { ...query, lessons: { $lte: obj.maxLessons } };

      if (obj.minInitCourseDate) query = { ...query, initCourseDate: { $gte: obj.minInitCourseDate } };

      if (obj.maxInitCourseDate) query = { ...query, initCourseDate: { $lte: obj.maxInitCourseDate } };

      if (obj.courses) query = { ...query, _id: { $in: obj.courses } };

      if (obj.searchQuery) query = { ...query, name: { $regex: new RegExp(obj.searchQuery.toLowerCase(), "i") } };

      const coursesData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (coursesData.length > 0) {
        await Promise.all(coursesData.map(async (courseData: any) => {
          const courseMap: ICourse = courseRealmDataToEntity(courseData);

          if (courseMap.teacherId.length > 0) {
            const teacherData = await mongo.db(DATABASE_NAME).collection("Teachers").findOne({ _id: courseMap.teacherId });
            const teacherJSON =  JSON.parse(JSON.stringify(teacherData));

            const teacherMap: ITeacher = teacherRealmDataToEntity(teacherJSON);

            if (teacherMap.teacherId.length > 0) courseMap.teacher = teacherMap;
          }

          const inShoppingCart = await mongo.db(DATABASE_NAME).collection("ShoppingCarts").count({ userId: obj.userId ?? "", courses: courseMap.courseId });
          
          const inSales = await mongo.db(DATABASE_NAME).collection("Sales").count({ userId: obj.userId ?? "", courses: courseMap.courseId, status: "pending" });

          courseMap.inShoppingCart = inShoppingCart > 0 || inSales > 0 ? true : false;

          const isFavorite = await mongo.db(DATABASE_NAME).collection("Users").count({ _id: obj.userId ?? "", favouritesCourses: courseMap.courseId });

          courseMap.isFavorite = isFavorite > 0 ? true : false;

          const coursesCount = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ courseId: courseMap.courseId });

          courseMap.students = coursesCount;

         if (obj.userId) {
          const coursesIsBuying = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ userId: obj.userId, courseId: courseMap.courseId });

          if (coursesIsBuying > 0) courseMap.isBuying = true;
         }


          if (courseMap.courseId.length > 0) courses.push(courseMap);
        }));
      }

      const coursesTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetCoursesResponse = {
        data: JSON.parse(JSON.stringify(courses)),
        metadata: JSON.parse(JSON.stringify({
          total: coursesTotal,
          limit: obj.limit ?? 999,
        })), 
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCoursesFailureRealmMapper(exception.error);
    }
  }

  async getCoursesCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Courses");

      const coursesCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return coursesCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetCoursesFailureRealmMapper(exception.error);
    }
  }

  async getCourseById(obj: { courseId: string; userId?: string | null }): Promise<IGetCourseByIdResponse | ICourseFailure> {
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

        const isFavorite = await mongo.db(DATABASE_NAME).collection("Users").count({ _id: obj.userId ?? "", favouritesCourses: course.courseId });

        course.isFavorite = isFavorite > 0 ? true : false;

        const coursesCount = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ courseId: course.courseId });

        course.students = coursesCount;

       if (obj.userId) {
        const coursesIsBuying = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ userId: obj.userId, courseId: course.courseId });

        if (coursesIsBuying > 0) course.isBuying = true;
       }
      }

      const response: IGetCourseByIdResponse = {
        data: JSON.parse(JSON.stringify(course)),
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCourseFailureRealmMapper(exception.error);
    }
  }

  async createCourse(obj: { course: ICourse }): Promise<ICreateCoursesResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Courses");

      obj.course.courseId = nanoid(20);
      obj.course.slug = obj.course.name.toLowerCase().replace(/ /g, '-') .replace(/[^\w-]+/g, '');
      obj.course.teacherId = currentUser.id;
      
      const data = await collection.count({ slug: obj.course.slug });

      if (data) throw new Error("create-course/slug-in-use");

      if (obj.course.mainPicture) {
        if (obj.course.mainPicture.file) {
          const fileRef = ref(storage, `Courses/${obj.course.courseId}/main-picture-${new Date().getTime()}-${nanoid(11)}`);

          await uploadBytes(fileRef, obj.course.mainPicture.file);
        
          const pictureUrl = await getDownloadURL(fileRef);

          obj.course.mainPictureUrl = pictureUrl;
        }
      }

      if (obj.course.mainVideo) {
        if (obj.course.mainVideo.file) {
          const fileRef = ref(storage, `Courses/${obj.course.courseId}/main-video-${new Date().getTime()}-${nanoid(11)}`);

          await uploadBytes(fileRef, obj.course.mainVideo.file);
        
          const videoUrl = await getDownloadURL(fileRef);

          obj.course.mainVideoUrl = videoUrl;
        }
      }
     
      obj.course.createdAt = new Date();

      await collection.insertOne(courseFromRealmToDocumentData(obj.course));

      const response: IGetCourseByIdResponse = {
        data: obj.course,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }

  async editCourse(obj: { course: ICourse }): Promise<ICourse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Courses");

      obj.course.updatedAt = new Date();

      await collection.updateOne(
        { _id: obj.course.courseId },
        { $set: courseFromRealmToDocumentData(obj.course) }
      );

      return obj.course;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }

  async editDisabledCourse(obj: { courseId: string; disabled: Date | null }): Promise<boolean | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Courses");

      await collection.updateOne(
        { _id: obj.courseId },
        { $set: { disabledAt: obj.disabled } }
      );

      return true;
    } catch (error) {
      const exception = error as any; 
      return fromEditDisabledCourseFailureRealmMapper(exception.error);
    }
  }

  async getCoursesTags(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<IGetCoursesTagResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("CoursesTags");

      const courses: ICourseTag[] = [];

      const coursesData = await collection.aggregate([
        { $match: obj.query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);
      const coursesJSON = JSON.parse(JSON.stringify(coursesData));

      if (coursesJSON.length > 0) {
        await Promise.all(coursesJSON.map(async (courseData: any) => {
          const courseMap: ICourseTag = courseTagRealmDataToEntity(courseData);

          if (courseMap.courseTagId.length > 0) courses.push(courseMap);
        }));
      }

      const coursesTotal = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      const response: IGetCoursesTagResponse = {
        data: courses,
        metadata: {
          total: coursesTotal,
          limit: obj.limit ?? 999,
        }
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCoursesFailureRealmMapper(exception.error);
    }
  }

  async getCoursesWhiteList(obj: { userId: string, sort?: Object | null; limit?: number | null; skip?: number | null; }): Promise<IGetCoursesResponse | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      let user: IUser = {} as IUser;

      const userData = await collection.findOne({ _id: obj.userId });

      if (!userData) throw new Error("user not-found");
    
      user = userRealmDataToEntity(userData);

      const courses: ICourse[] = [];

      const coursesData = await mongo.db(DATABASE_NAME).collection("Courses").aggregate([
        { $match: { _id: { $in: user.favouritesCourses } } },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (coursesData.length > 0) {
        await Promise.all(coursesData.map(async (courseData: any) => {
          const courseMap: ICourse = courseRealmDataToEntity(courseData);

          if (courseMap.teacherId.length > 0) {
            const teacherData = await mongo.db(DATABASE_NAME).collection("Teachers").findOne({ _id: courseMap.teacherId });
            const teacherJSON =  JSON.parse(JSON.stringify(teacherData));

            const teacherMap: ITeacher = teacherRealmDataToEntity(teacherJSON);

            if (teacherMap.teacherId.length > 0) courseMap.teacher = teacherMap;
          }

          const inShoppingCart = await mongo.db(DATABASE_NAME).collection("ShoppingCarts").count({ userId: obj.userId ?? "", courses: courseMap.courseId });
          
          const inSales = await mongo.db(DATABASE_NAME).collection("Sales").count({ userId: obj.userId ?? "", courses: courseMap.courseId, status: "pending" });

          courseMap.inShoppingCart = inShoppingCart > 0 || inSales > 0 ? true : false;

          const coursesCount = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ courseId: courseMap.courseId });

          courseMap.students = coursesCount;

         if (obj.userId) {
          const coursesIsBuying = await mongo.db(DATABASE_NAME).collection("CourseUsers").count({ userId: obj.userId, courseId: courseMap.courseId });

          if (coursesIsBuying > 0) courseMap.isBuying = true;
         }


          if (courseMap.courseId.length > 0) courses.push(courseMap);
        }));
      }

      const coursesTotal = await collection.count({ _id: { $in: user.favouritesCourses } });

      const response: IGetCoursesResponse = {
        data: JSON.parse(JSON.stringify(courses)),
        metadata: JSON.parse(JSON.stringify({
          total: coursesTotal,
          limit: obj.limit ?? 999,
        })), 
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetCoursesFailureRealmMapper(exception.error);
    }
  }

  async addCourseWhiteList(obj: { userId: string; courseId: string }): Promise<boolean | ICourseFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      const courseIsFavourite = await collection.count({ _id: obj.userId, favouritesCourses: { $in: [obj.courseId] } });

      if (courseIsFavourite === 0) {
        await collection.updateOne(
          { _id: obj.userId },
          { $addToSet: { favouritesCourses: obj.courseId } }
        );
      } else {
        await collection.updateOne(
          { _id: obj.userId },
          { $pull: { favouritesCourses: obj.courseId } }
        );
      }

      return true;
    } catch (error) {
      const exception = error as any; 
      return fromCreateCourseFailureRealmMapper(exception.error);
    }
  }
}
