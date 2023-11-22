import { ITeacher } from "domain/core/entities/teacherEntity";
import { ICreateTeachersResponse, IGetTeacherByIdResponse, IGetTeachersResponse } from "domain/core/response/teacher/teacherResponsesEntities";
import TeacherRealmDatasource from "infrastructure/datasources/teacher/realm/teacherRealmDatasource";

export default class TeacherUseCases {
  private _repository: TeacherRealmDatasource = new TeacherRealmDatasource();

  async getTeachers(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetTeachersResponse> {
    try {
      const response = await this._repository.getTeachers({ sort: obj.sort, limit: obj.limit, skip: obj.skip, searchQuery: obj.searchQuery });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTeachersCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getTeachersCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTeacherById(obj: { teacherId: string }): Promise<IGetTeacherByIdResponse> {
    try {
      const response = await this._repository.getTeacherById({ teacherId: obj.teacherId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createTeacher(obj: { teacher: ITeacher; password: string }): Promise<ICreateTeachersResponse> {
    try {
      const response = await this._repository.createTeacher({ teacher: obj.teacher, password: obj.password });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
