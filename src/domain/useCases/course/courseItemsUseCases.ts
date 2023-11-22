import { ICourseItem } from "domain/core/entities/courseEntity";
import { ICreateCoursesItemsResponse, IGetCourseItemByIdResponse, IGetCoursesItemsResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseItemsRealmDatasource from "infrastructure/datasources/course/realm/courseItemsRealmDatasource";

export default class CourseItemsUseCases {
  private _repository: CourseItemsRealmDatasource = new CourseItemsRealmDatasource();

  async getCoursesItems(obj: { courseId?: string | null; courseLessonId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesItemsResponse> {
    try {
      const response = await this._repository.getCourseItems({ courseId: obj.courseId, courseLessonId: obj.courseLessonId, sort: obj.sort, limit: obj.limit, skip: obj.skip, searchQuery: obj.searchQuery });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseItemsCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getCourseItemsCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseItemById(obj: { courseLessonId: string; courseItemId: string }): Promise<IGetCourseItemByIdResponse> {
    try {
      const response = await this._repository.getCourseItemById({ courseLessonId: obj.courseLessonId, courseItemId: obj.courseItemId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createCourseItem(obj: { courseItem: ICourseItem }): Promise<ICreateCoursesItemsResponse> {
    try {
      const response = await this._repository.createCourseItem({ courseItem: obj.courseItem });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editCourseItem(obj: { courseItem: ICourseItem }): Promise<ICourseItem> {
    try {
      const response = await this._repository.editCourseItem({ courseItem: obj.courseItem });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
