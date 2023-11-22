import { ITeacher } from "domain/core/entities/teacherEntity";
import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";
import { ICreateTeachersResponse, IGetTeacherByIdResponse, IGetTeachersResponse } from "domain/core/response/teacher/teacherResponsesEntities";

export default interface ITeacherRepository {
  getTeachers(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetTeachersResponse | ITeacherFailure>;
  getTeachersCount(obj: { query?: Object | null; }): Promise<number | ITeacherFailure>;
  getTeacherById(obj: { teacherId: string }): Promise<IGetTeacherByIdResponse | ITeacherFailure>;
  createTeacher(obj: { teacher: ITeacher; password: string }): Promise<ICreateTeachersResponse | ITeacherFailure>;
}
