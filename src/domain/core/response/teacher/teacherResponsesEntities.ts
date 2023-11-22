import { ITeacher } from "domain/core/entities/teacherEntity";
import { IResponseMetadata } from "../responseEntity";

export interface IGetTeachersResponse {
    data: ITeacher[];
    metadata: IResponseMetadata;
}

export interface IGetTeacherByIdResponse {
    data: ITeacher;
    metadata: IResponseMetadata;
}

export interface ICreateTeachersResponse {
    data: ITeacher;
    metadata: IResponseMetadata;
}
