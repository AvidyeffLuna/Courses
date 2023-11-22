import { ICourse } from "domain/core/entities/courseEntity";
import { ICreateCoursesResponse, IGetCourseByIdResponse, IGetCoursesResponse, IGetCoursesTagResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseRealmDatasource from "infrastructure/datasources/course/realm/courseRealmDatasource";

export default class CourseUseCases {
  private _repository: CourseRealmDatasource = new CourseRealmDatasource();

  async getCourses(obj: { userId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; teacherId?: string | null; searchQuery?: string | null; minPrice?: number | null; maxPrice?: number | null; minLessons?: number | null; maxLessons?: number | null; minInitCourseDate?: Date | null; maxInitCourseDate?: Date | null; courses?: string[] | null }): Promise<IGetCoursesResponse> {
    try {
      const response = await this._repository.getCourses({ userId: obj.userId, sort: obj.sort, limit: obj.limit, skip: obj.skip, teacherId: obj.teacherId, minPrice: obj.minPrice, maxPrice: obj.maxPrice, searchQuery: obj.searchQuery, minLessons: obj.minLessons, maxLessons: obj.maxLessons, minInitCourseDate: obj.minInitCourseDate, maxInitCourseDate: obj.maxInitCourseDate, courses: obj.courses });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getCoursesCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseById(obj: { courseId: string; userId?: string | null }): Promise<IGetCourseByIdResponse> {
    try {
      const response = await this._repository.getCourseById({ courseId: obj.courseId, userId: obj.userId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createCourse(obj: { course: ICourse }): Promise<ICreateCoursesResponse> {
    try {
      const response = await this._repository.createCourse({ course: obj.course });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editCourse(obj: { course: ICourse }): Promise<ICourse> {
    try {
      const response = await this._repository.editCourse({ course: obj.course });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editDisabledCourse(obj: { courseId: string; disabled: Date | null }): Promise<boolean> {
    try {
      const response = await this._repository.editDisabledCourse({ courseId: obj.courseId, disabled: obj.disabled });

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesTags(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<IGetCoursesTagResponse> {
    try {
      const response = await this._repository.getCoursesTags({ query: obj.query, sort: obj.sort, limit: obj.limit, skip: obj.skip });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesWhiteList(obj: { userId: string, sort?: Object | null; limit?: number | null; skip?: number | null; }): Promise<IGetCoursesResponse> {
    try {
      const response = await this._repository.getCoursesWhiteList({ userId: obj.userId, sort: obj.sort, limit: obj.limit, skip: obj.skip });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async addCourseWhiteList(obj: { userId: string; courseId: string }): Promise<boolean> {
    try {
      const response = await this._repository.addCourseWhiteList({ userId: obj.userId, courseId: obj.courseId });

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
