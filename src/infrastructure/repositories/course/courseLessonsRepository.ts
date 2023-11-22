import { ICourseLesson } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesLessonsResponse, IGetCourseLessonByIdResponse, IGetCoursesLessonsResponse } from "domain/core/response/course/courseResponsesEntities";

export default interface ICourseLessonsRepository {
  getCourseLessons(obj: { courseId?: string | null; sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetCoursesLessonsResponse | ICourseFailure>;
  getCourseLessonsCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure>;
  getCourseLessonById(obj: { courseId: string; courseLessonId: string }): Promise<IGetCourseLessonByIdResponse | ICourseFailure>;
  createCourseLesson(obj: { courseLesson: ICourseLesson }): Promise<ICreateCoursesLessonsResponse | ICourseFailure>;
  editCourseLesson(obj: { courseLesson: ICourseLesson }): Promise<ICourseLesson | ICourseFailure>;
}
