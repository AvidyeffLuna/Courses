import { ICourseTask } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesTasksResponse, IGetCourseTaskByIdResponse, IGetCoursesTasksResponse, IEditFinishCoursesTasksResponse } from "domain/core/response/course/courseResponsesEntities";

export default interface ICourseTasksRepository {
  getCourseTasks(obj: { courseId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesTasksResponse | ICourseFailure>;
  getCourseTasksCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure>;
  getCourseTaskById(obj: { courseTaskId: string }): Promise<IGetCourseTaskByIdResponse | ICourseFailure>;
  createCourseTask(obj: { courseTask: ICourseTask }): Promise<ICreateCoursesTasksResponse | ICourseFailure>;
  editCourseTask(obj: { courseTask: ICourseTask }): Promise<ICourseTask | ICourseFailure>;
  editFinishCourseTask(obj: { courseId: string; courseTaskId: string; userId: string; score: number; note: string }): Promise<IEditFinishCoursesTasksResponse | ICourseFailure>;
}
