import { ICourseItem } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesItemsResponse, IGetCourseItemByIdResponse, IGetCoursesItemsResponse } from "domain/core/response/course/courseResponsesEntities";

export default interface ICourseItemsRepository {
  getCourseItems(obj: { courseId?: string | null; courseLessonId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesItemsResponse | ICourseFailure>;
  getCourseItemsCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure>;
  getCourseItemById(obj: { courseLessonId: string; courseItemId: string }): Promise<IGetCourseItemByIdResponse | ICourseFailure>;
  createCourseItem(obj: { courseItem: ICourseItem }): Promise<ICreateCoursesItemsResponse | ICourseFailure>;
  editCourseItem(obj: { courseItem: ICourseItem }): Promise<ICourseItem | ICourseFailure>;
}
