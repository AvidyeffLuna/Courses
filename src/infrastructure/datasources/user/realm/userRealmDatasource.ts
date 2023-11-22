import IUserFailure from "domain/core/failures/user/userFailure";
import { fromCreateUserFailureRealmMapper, fromGetUserFailureRealmMapper, fromGetUsersFailureRealmMapper } from "domain/mappers/failures/user/realm/userRealmFailuresMapper";
import { userFromRealmToDocumentData } from "domain/mappers/user/realm/userRealmMapper";
import { app, CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import IUserRepository from "infrastructure/repositories/user/userRepository";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";
import { IUser } from "domain/core/entities/userEntity";
import { ICreateUsersResponse, IGetUserByIdResponse, IGetUsersResponse } from "domain/core/response/user/userResponsesEntities";
import * as RealmAuth from "realm-web";

export default class UserRealmDatasource implements IUserRepository {
  async getUsers(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetUsersResponse | IUserFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      const users: IUser[] = [];

      let query = {};

      if (obj.searchQuery) query = { ...query, firstName: obj.searchQuery };

      const usersData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (usersData.length > 0) {
        await Promise.all(usersData.map(async (userData: any) => {
          const userMap: IUser = userRealmDataToEntity(userData);

          if (userMap.userId.length > 0) users.push(userMap);
        }));
      }

      const usersTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetUsersResponse = {
        data: JSON.parse(JSON.stringify(users)),
        metadata: JSON.parse(JSON.stringify({
          total: usersTotal,
          limit: obj.limit ?? 999,
        })), 
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetUsersFailureRealmMapper(exception.error);
    }
  }

  async getUsersCount(obj: { query?: Object | null; }): Promise<number | IUserFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      const usersCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return usersCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetUsersFailureRealmMapper(exception.error);
    }
  }

  async getUserById(obj: { userId: string }): Promise<IGetUserByIdResponse | IUserFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("Users");

      let user: IUser = {} as IUser;

      const userData = await collection.findOne({ _id: obj.userId });

      if (userData) user = userRealmDataToEntity(userData);

      const response: IGetUserByIdResponse = {
        data: JSON.parse(JSON.stringify(user)),
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetUserFailureRealmMapper(exception.error);
    }
  }

  async createUser(obj: { user: IUser; password: string }): Promise<ICreateUsersResponse | IUserFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Users");

      const emailUser = await collection.findOne({ email: obj.user.email });

      if (emailUser) throw new Error("name already in use");

      const collectionTeacher = mongo.db(DATABASE_NAME).collection("Teachers");

      const emailTeacher = await collectionTeacher.findOne({ email: obj.user.email });

      if (emailTeacher) throw new Error("name already in use");

      await app.emailPasswordAuth.registerUser({ email: obj.user.email, password: obj.password });

      const credentials = RealmAuth.Credentials.emailPassword(obj.user.email, obj.password);
      const user = await app.logIn(credentials);
      
      const authenticatedUser = Object.values(app.allUsers).filter(
        (user) => user.id === currentUser.id
      );

      obj.user.userId = user.id;
      obj.user.createdAt = new Date();

      await collection.insertOne(userFromRealmToDocumentData(obj.user));

      if (authenticatedUser.length > 0) {
        app.switchUser(authenticatedUser[0]);
        user.logOut();
      }

      const response: ICreateUsersResponse = {
        data: obj.user,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateUserFailureRealmMapper(exception.error);
    }
  }
}
