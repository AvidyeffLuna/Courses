import { ICourse } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesResponse, IGetCourseByIdResponse, IGetCoursesResponse, IGetCoursesTagResponse } from "domain/core/response/course/courseResponsesEntities";

export default interface ICourseRepository {
  getCourses(obj: { userId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; teacherId?: string | null; searchQuery?: string | null; minPrice?: number | null; maxPrice?: number | null; minLessons?: number | null; maxLessons?: number | null; minInitCourseDate?: Date | null; maxInitCourseDate?: Date | null; courses?: string[] | null }): Promise<IGetCoursesResponse | ICourseFailure>;
  getCoursesCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure>;
  getCourseById(obj: { courseId: string; userId?: string | null }): Promise<IGetCourseByIdResponse | ICourseFailure>;
  createCourse(obj: { course: ICourse }): Promise<ICreateCoursesResponse | ICourseFailure>;
  editCourse(obj: { course: ICourse }): Promise<ICourse | ICourseFailure>;
  editDisabledCourse(obj: { courseId: string; disabled: Date | null }): Promise<boolean | ICourseFailure>;
  getCoursesTags(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<IGetCoursesTagResponse | ICourseFailure>;
  getCoursesWhiteList(obj: { userId: string, sort?: Object | null; limit?: number | null; skip?: number | null; }): Promise<IGetCoursesResponse | ICourseFailure>;
  addCourseWhiteList(obj: { userId: string; courseId: string }): Promise<boolean | ICourseFailure>;
}
