import { ICourse, ICourseTask } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesTasksCreateState {
    course: IGetCourseByIdState;
    createCourseTask: ICreateCourseTaskState;
}

interface IGetCourseByIdState {
    data: ICourse;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}


interface ICreateCourseTaskState {
    data: ICourseTask;
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
    createCourseTask: {
        data: {} as ICourseTask,
        loading: false,
        sucessful: false,
        error: null,
    },
};
