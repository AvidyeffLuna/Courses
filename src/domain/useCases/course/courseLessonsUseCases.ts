import { ICourseLesson } from "domain/core/entities/courseEntity";
import { ICreateCoursesLessonsResponse, IGetCourseLessonByIdResponse, IGetCoursesLessonsResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseLessonsRealmDatasource from "infrastructure/datasources/course/realm/courseLessonsRealmDatasource";

export default class CourseLessonsUseCases {
  private _repository: CourseLessonsRealmDatasource = new CourseLessonsRealmDatasource();

  async getCoursesLessons(obj: { courseId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesLessonsResponse> {
    try {
      const response = await this._repository.getCourseLessons({ courseId: obj.courseId, sort: obj.sort, limit: obj.limit, skip: obj.skip, searchQuery: obj.searchQuery });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseLessonsCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getCourseLessonsCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseLessonById(obj: { courseId: string; courseLessonId: string }): Promise<IGetCourseLessonByIdResponse> {
    try {
      const response = await this._repository.getCourseLessonById({ courseId: obj.courseId, courseLessonId: obj.courseLessonId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createCourseLesson(obj: { courseLesson: ICourseLesson }): Promise<ICreateCoursesLessonsResponse> {
    try {
      const response = await this._repository.createCourseLesson({ courseLesson: obj.courseLesson });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editCourseLesson(obj: { courseLesson: ICourseLesson }): Promise<ICourseLesson> {
    try {
      const response = await this._repository.editCourseLesson({ courseLesson: obj.courseLesson });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
