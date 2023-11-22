import { ICourseUser } from "domain/core/entities/courseEntity";
import { ICreateCoursesUsersResponse, IGetCourseUserByIdResponse, IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseUsersRealmDatasource from "infrastructure/datasources/course/realm/courseUsersRealmDatasource";

export default class CourseUsersUseCases {
  private _repository: CourseUsersRealmDatasource = new CourseUsersRealmDatasource();

  async getCoursesUsers(obj: { userId?: string | null; courseId?: string | null; courseLessonId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesUsersResponse> {
    try {
      const response = await this._repository.getCourseUsers({ userId: obj.userId, courseId: obj.courseId, courseLessonId: obj.courseLessonId, sort: obj.sort, limit: obj.limit, skip: obj.skip, searchQuery: obj.searchQuery });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseUsersCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getCourseUsersCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseUserById(obj: { userId: string; courseId: string }): Promise<IGetCourseUserByIdResponse> {
    try {
      const response = await this._repository.getCourseUserById({ userId: obj.userId, courseId: obj.courseId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createCourseUser(obj: { courseUser: ICourseUser }): Promise<ICreateCoursesUsersResponse> {
    try {
      const response = await this._repository.createCourseUser({ courseUser: obj.courseUser });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
