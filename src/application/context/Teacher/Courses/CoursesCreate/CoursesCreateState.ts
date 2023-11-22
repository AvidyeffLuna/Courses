import { ICourse, ICourseTag } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesCreateState {
    createCourse: ICreateCourseState;
    course: IGetCourseByIdState;
    courseTags: IGetCourseTagsState;
}

interface ICreateCourseState {
    data: ICourse;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
    limit: number,
}

interface IGetCourseByIdState {
    data: ICourse;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetCourseTagsState {
    data: ICourseTag[];
    total: number;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

export const initialState = {
    createCourse: {
        data: {} as ICourse,
        total: 0,
        loading: false,
        sucessful: false,
        error: null,
    },
    course: {
        data: {} as ICourse,
        loading: false,
        sucessful: false,
        error: null,
    },
    courseTags: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
    },
};
