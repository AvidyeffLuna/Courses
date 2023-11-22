import { ICourse, ICourseLesson } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesLessonsCreateState {
    course: IGetCourseByIdState;
    createCourseLesson: ICreateCourseLessonState;
}

interface IGetCourseByIdState {
    data: ICourse;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}


interface ICreateCourseLessonState {
    data: ICourseLesson;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
    limit: number,
}

export const initialState = {
    course: {
        data: {} as ICourse,
        loading: false,
        sucessful: false,
        error: null,
    },
    createCourseLesson: {
        data: {} as ICourseLesson,
        loading: false,
        sucessful: false,
        error: null,
    },
};
