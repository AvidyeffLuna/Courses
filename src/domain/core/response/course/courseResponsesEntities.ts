import { ICourse, ICourseItem, ICourseLesson, ICourseTag, ICourseTask, ICourseUser } from "domain/core/entities/courseEntity";
import { IResponseMetadata } from "../responseEntity";

export interface IGetCoursesResponse {
    data: ICourse[];
    metadata: IResponseMetadata;
}

export interface IGetCourseByIdResponse {
    data: ICourse;
    metadata: IResponseMetadata;
}

export interface ICreateCoursesResponse {
    data: ICourse;
    metadata: IResponseMetadata;
}

export interface IGetCoursesTagResponse {
    data: ICourseTag[];
    metadata: IResponseMetadata;
}

export interface IGetCoursesLessonsResponse {
    data: ICourseLesson[];
    metadata: IResponseMetadata;
}

export interface IGetCourseLessonByIdResponse {
    data: ICourseLesson;
    metadata: IResponseMetadata;
}

export interface ICreateCoursesLessonsResponse {
    data: ICourseLesson;
    metadata: IResponseMetadata;
}

export interface IGetCoursesItemsResponse {
    data: ICourseItem[];
    metadata: IResponseMetadata;
}

export interface IGetCourseItemByIdResponse {
    data: ICourseItem;
    metadata: IResponseMetadata;
}

export interface ICreateCoursesItemsResponse {
    data: ICourseItem;
    metadata: IResponseMetadata;
}

export interface IGetCoursesTasksResponse {
    data: ICourseTask[];
    metadata: IResponseMetadata;
}

export interface IGetCourseTaskByIdResponse {
    data: ICourseTask;
    metadata: IResponseMetadata;
}

export interface ICreateCoursesTasksResponse {
    data: ICourseTask;
    metadata: IResponseMetadata;
}

export interface IEditFinishCoursesTasksResponse {
    data?: ICourseTask | null;
    metadata: IResponseMetadata;
}

export interface IGetCoursesUsersResponse {
    data: ICourseUser[];
    metadata: IResponseMetadata;
}

export interface IGetCourseUserByIdResponse {
    data: ICourseUser;
    metadata: IResponseMetadata;
}

export interface ICreateCoursesUsersResponse {
    data: ICourseUser;
    metadata: IResponseMetadata;
}