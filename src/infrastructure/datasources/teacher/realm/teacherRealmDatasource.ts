import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";
import { fromCreateTeacherFailureRealmMapper, fromGetTeacherFailureRealmMapper, fromGetTeachersFailureRealmMapper } from "domain/mappers/failures/teacher/realm/teacherRealmFailuresMapper";
import { teacherFromRealmToDocumentData } from "domain/mappers/teacher/realm/teacherRealmMapper";
import { app, CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ITeacherRepository from "infrastructure/repositories/teacher/teacherRepository";
import { teacherRealmDataToEntity } from "domain/mappers/teacher/realm/teacherRealmMapper";
import { ITeacher } from "domain/core/entities/teacherEntity";
import { ICreateTeachersResponse, IGetTeacherByIdResponse, IGetTeachersResponse } from "domain/core/response/teacher/teacherResponsesEntities";
import * as RealmAuth from "realm-web";

export default class TeacherRealmDatasource implements ITeacherRepository {
  async getTeachers(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetTeachersResponse | ITeacherFailure> {
    try {
      const currentTeacher = await getCurrentUser();

      const mongo = currentTeacher.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Teachers");

      const teachers: ITeacher[] = [];

      let query = {};

      if (obj.searchQuery) query = { ...query, firstName: obj.searchQuery };

      const teachersData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (teachersData.length > 0) {
        await Promise.all(teachersData.map(async (teacherData: any) => {
          const teacherMap: ITeacher = teacherRealmDataToEntity(teacherData);

          if (teacherMap.teacherId.length > 0) teachers.push(teacherMap);
        }));
      }

      const teachersTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetTeachersResponse = {
        data: JSON.parse(JSON.stringify(teachers)),
        metadata: JSON.parse(JSON.stringify({
          total: teachersTotal,
          limit: obj.limit ?? 999,
        })), 
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetTeachersFailureRealmMapper(exception.error);
    }
  }

  async getTeachersCount(obj: { query?: Object | null; }): Promise<number | ITeacherFailure> {
    try {
      const currentTeacher = await getCurrentUser();

      const mongo = currentTeacher.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Teachers");

      const teachersCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return teachersCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetTeachersFailureRealmMapper(exception.error);
    }
  }

  async getTeacherById(obj: { teacherId: string }): Promise<IGetTeacherByIdResponse | ITeacherFailure> {
    try {
      const currentTeacher = await getCurrentUser();
      
      const mongo = currentTeacher.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("Teachers");

      let teacher: ITeacher = {} as ITeacher;

      const teacherData = await collection.findOne({ _id: obj.teacherId });

      if (teacherData) teacher = teacherRealmDataToEntity(teacherData);

      const response: IGetTeacherByIdResponse = {
        data: JSON.parse(JSON.stringify(teacher)),
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetTeacherFailureRealmMapper(exception.error);
    }
  }

  async createTeacher(obj: { teacher: ITeacher; password: string }): Promise<ICreateTeachersResponse | ITeacherFailure> {
    try {
      const currentTeacher = await getCurrentUser();

      const mongo = currentTeacher.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Teachers");

      const emailTeacher = await collection.findOne({ email: obj.teacher.email });

      if (emailTeacher) throw new Error("name already in use");

      const collectionTeacher = mongo.db(DATABASE_NAME).collection("Users");

      const emailUser = await collectionTeacher.findOne({ email: obj.teacher.email });

      if (emailUser) throw new Error("name already in use");

      await app.emailPasswordAuth.registerUser({ email: obj.teacher.email, password: obj.password });

      const credentials = RealmAuth.Credentials.emailPassword(obj.teacher.email, obj.password);
      const user = await app.logIn(credentials);
      
      const authenticatedUser = Object.values(app.allUsers).filter(
        (user) => user.id === currentTeacher.id
      );

      obj.teacher.teacherId = user.id;
      obj.teacher.createdAt = new Date();

      await collection.insertOne(teacherFromRealmToDocumentData(obj.teacher));

      if (authenticatedUser.length > 0) {
        app.switchUser(authenticatedUser[0]);
        user.logOut();
      }
      
      const response: ICreateTeachersResponse = {
        data: obj.teacher,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateTeacherFailureRealmMapper(exception.error);
    }
  }
}
