import { ICourseUser } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesUsersResponse, IGetCourseUserByIdResponse, IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";

export default interface ICourseUsersRepository {
  getCourseUsers(obj: { userId: string; sort?: Object | null; limit?: number | null; skip?: number | null; }): Promise<IGetCoursesUsersResponse | ICourseFailure>;
  getCourseUsersCount(obj: { query?: Object | null; }): Promise<number | ICourseFailure>;
  getCourseUserById(obj: { userId: string; courseId: string }): Promise<IGetCourseUserByIdResponse | ICourseFailure>;
  createCourseUser(obj: { courseUser: ICourseUser }): Promise<ICreateCoursesUsersResponse | ICourseFailure>;
}
