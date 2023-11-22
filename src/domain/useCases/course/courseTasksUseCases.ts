import { ICourseTask } from "domain/core/entities/courseEntity";
import { ICreateCoursesTasksResponse, IGetCourseTaskByIdResponse, IGetCoursesTasksResponse, IEditFinishCoursesTasksResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseTasksRealmDatasource from "infrastructure/datasources/course/realm/courseTasksRealmDatasource ";

export default class CourseTasksUseCases {
  private _repository: CourseTasksRealmDatasource = new CourseTasksRealmDatasource();

  async getCoursesTasks(obj: { courseId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesTasksResponse> {
    try {
      const response = await this._repository.getCourseTasks({ courseId: obj.courseId, sort: obj.sort, limit: obj.limit, skip: obj.skip, searchQuery: obj.searchQuery });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseTasksCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getCourseTasksCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCourseTaskById(obj: { courseTaskId: string }): Promise<IGetCourseTaskByIdResponse> {
    try {
      const response = await this._repository.getCourseTaskById({ courseTaskId: obj.courseTaskId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createCourseTask(obj: { courseTask: ICourseTask }): Promise<ICreateCoursesTasksResponse> {
    try {
      const response = await this._repository.createCourseTask({ courseTask: obj.courseTask });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editCourseTask(obj: { courseTask: ICourseTask }): Promise<ICourseTask> {
    try {
      const response = await this._repository.editCourseTask({ courseTask: obj.courseTask });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editFinishCourseTask(obj: { courseId: string; courseTaskId: string; userId: string; score: number; note: string }): Promise<IEditFinishCoursesTasksResponse> {
    try {
      const response = await this._repository.editFinishCourseTask({ courseId: obj.courseId, courseTaskId: obj.courseTaskId, userId: obj.userId, score: obj.score, note: obj.note });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
