import { IShoppingCart } from "domain/core/entities/shoppingCartEntity";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { fromAddCourseToShoppingCartFailureRealmMapper, fromCreateShoppingCartFailureRealmMapper,  fromGetShoppingCartFailureRealmMapper, fromGetShoppingCartsFailureRealmMapper, fromRemoveCourseToShoppingCartFailureRealmMapper } from "domain/mappers/failures/shoppingCart/realm/shoppingCartRealmFailuresMapper";
import { shoppingCartFromRealmToDocumentData, shoppingCartRealmDataToEntity } from "domain/mappers/shoppingCart/realm/shoppingCartRealmMapper";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import IShoppingCartRepository from "infrastructure/repositories/shoppingCart/shoppingCartRepository";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";
import { IUser } from "domain/core/entities/userEntity";
import { IAddCourseToShoppingCartResponse, IGetShoppingCartByIdResponse, IGetShoppingCartsResponse, IRemoveCourseToShoppingCartResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import { nanoid } from "nanoid";
import { ICourse } from "domain/core/entities/courseEntity";
import { courseRealmDataToEntity } from "domain/mappers/course/realm/courseRealmMapper";
import { ITeacher } from "domain/core/entities/teacherEntity";
import { teacherRealmDataToEntity } from "domain/mappers/teacher/realm/teacherRealmMapper";

export default class ShoppingCartRealmDatasource implements IShoppingCartRepository {
  async getShoppingCarts(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; }): Promise<IGetShoppingCartsResponse | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      const shoppingCarts: IShoppingCart[] = [];

      let query = {};

      const shoppingCartsData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (shoppingCartsData.length > 0) {
        await Promise.all(shoppingCartsData.map(async (shoppingCartData: any) => {
          const shoppingCartMap: IShoppingCart = shoppingCartRealmDataToEntity(shoppingCartData);

          if (shoppingCartMap.userId.length > 0) {
            const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: shoppingCartMap.userId });
            const userJSON =  JSON.parse(JSON.stringify(userData));

            const userMap: IUser = userRealmDataToEntity(userJSON);

            if (userMap.userId.length > 0) shoppingCartMap.user = userMap;
          }

          if (shoppingCartMap.shoppingCartId.length > 0) shoppingCarts.push(shoppingCartMap);
        }));
      }

      const shoppingCartsTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetShoppingCartsResponse = {
        data: JSON.parse(JSON.stringify(shoppingCarts)),
        metadata: JSON.parse(JSON.stringify({
          total: shoppingCartsTotal,
          limit: obj.limit ?? 999,
        })), 
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetShoppingCartsFailureRealmMapper(exception.error);
    }
  }

  async getShoppingCartsCount(obj: { query?: Object | null; }): Promise<number | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      const shoppingCartsCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return shoppingCartsCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetShoppingCartsFailureRealmMapper(exception.error);
    }
  }

  async getShoppingCartById(obj: { shoppingCartId: string }): Promise<IGetShoppingCartByIdResponse | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      let shoppingCart: IShoppingCart = {} as IShoppingCart;

      const shoppingCartData = await collection.findOne({ _id: obj.shoppingCartId });

      if (shoppingCartData) {
        shoppingCart = shoppingCartRealmDataToEntity(shoppingCartData);
        
        if (shoppingCart.userId.length > 0) {
          const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: shoppingCart.userId });
          const userJSON = JSON.parse(JSON.stringify(userData));
  
          const userMap: IUser = userRealmDataToEntity(userJSON);
  
          if (userMap.userId.length > 0) shoppingCart.user = userMap;
        }
      }

      const response: IGetShoppingCartByIdResponse = {
        data: JSON.parse(JSON.stringify(shoppingCart)),
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetShoppingCartFailureRealmMapper(exception.error);
    }
  }

  async getShoppingCartByUserId(obj: { userId: string }): Promise<IGetShoppingCartByIdResponse | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      let shoppingCart: IShoppingCart = {} as IShoppingCart;

      const shoppingCartData = await collection.findOne({ userId: obj.userId});

      if (shoppingCartData) {
        shoppingCart = shoppingCartRealmDataToEntity(shoppingCartData);
        
        if (shoppingCart.userId.length > 0) {
          const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: shoppingCart.userId });
          const userJSON = JSON.parse(JSON.stringify(userData));
  
          const userMap: IUser = userRealmDataToEntity(userJSON);
  
          if (userMap.userId.length > 0) shoppingCart.user = userMap;
        }
      }

      const collectionCourses = mongo.db(DATABASE_NAME).collection("Courses");

      const coursesData = await collectionCourses.find({ _id: { $in: shoppingCart.courses } });

      const courses: ICourse[] = [];

      if (coursesData.length > 0) {
        await Promise.all(coursesData.map(async (courseData: any) => {
          const courseMap: ICourse = courseRealmDataToEntity(courseData);

          if (courseMap.teacherId.length > 0) {
            const teacherData = await mongo.db(DATABASE_NAME).collection("Teachers").findOne({ _id: courseMap.teacherId });
            const teacherJSON =  JSON.parse(JSON.stringify(teacherData));

            const teacherMap: ITeacher = teacherRealmDataToEntity(teacherJSON);

            if (teacherMap.teacherId.length > 0) courseMap.teacher = teacherMap;
          }

          if (courseMap.courseId.length > 0) courses.push(courseMap);
        }));
      }

      let totalPaid = 0;

      if (courses.length > 0) {
        courses.forEach((course: ICourse) => {
          totalPaid += course.price;
        });
      }

      const response: IGetShoppingCartByIdResponse = {
        data: {
          shoppingCart: JSON.parse(JSON.stringify(shoppingCart)),
          courses: JSON.parse(JSON.stringify(courses)),
          paidSummary: JSON.parse(JSON.stringify({
            coursesQuantity: courses.length,
            totalPaid,
          }))
        },
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetShoppingCartFailureRealmMapper(exception.error);
    }
  }

  async addCourseToShoppingCart(obj: { courseId: string }): Promise<IAddCourseToShoppingCartResponse | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      const shoppingCartCount = await collection.count({ userId: currentUser.id });

      if (shoppingCartCount === 0) {
        const shoppingCartCreate: IShoppingCart = {
          shoppingCartId: nanoid(20),
          userId: currentUser.id,
          courses: [],
          createdAt: new Date()
        } 

        await collection.insertOne(shoppingCartFromRealmToDocumentData(shoppingCartCreate));
      }

      await collection.updateOne(
        { userId: currentUser.id },
        { $addToSet: { courses: obj.courseId } }
      );

      const response: IAddCourseToShoppingCartResponse = {
        data: null,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromAddCourseToShoppingCartFailureRealmMapper(exception.error);
    }
  }

  async removeCourseToShoppingCart(obj: { courseId: string }): Promise<IRemoveCourseToShoppingCartResponse | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      await collection.updateOne(
        { userId: currentUser.id },
        { $pull: { courses: obj.courseId } }
      );

      const response: IRemoveCourseToShoppingCartResponse = {
        data: null,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromRemoveCourseToShoppingCartFailureRealmMapper(exception.error);
    }
  }

  async editShoppingCart(obj: { shoppingCart: IShoppingCart }): Promise<IShoppingCart | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      obj.shoppingCart.updatedAt = new Date();

      await collection.updateOne(
        { _id: obj.shoppingCart.shoppingCartId },
        { $set: shoppingCartFromRealmToDocumentData(obj.shoppingCart) }
      );

      return obj.shoppingCart;
    } catch (error) {
      const exception = error as any; 
      return fromCreateShoppingCartFailureRealmMapper(exception.error);
    }
  }

  async editCoursesShoppingCart(obj: { courses: string[] }): Promise<boolean | IShoppingCartFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("ShoppingCarts");

      await collection.updateOne(
        { userId: currentUser.id },
        { $set: { courses: obj.courses, updatedAt: new Date() } }
      );

      return true;
    } catch (error) {
      const exception = error as any; 
      return fromCreateShoppingCartFailureRealmMapper(exception.error);
    }
  }
}
