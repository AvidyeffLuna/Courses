import { ICourseItem, ICourseLesson, ICourseTask } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesViewState {
    lessons: IGetCourseLessonsState;
    lesson: IGetCourseLessonByIdState;
    item: IGetCourseItemByIdState;
    courseTasks: IGetCourseTasksState;
}

interface IGetCourseLessonsState {
    data: ICourseLesson[];
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetCourseLessonByIdState {
    data: ICourseLesson;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetCourseItemByIdState {
    data: ICourseItem;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetCourseTasksState {
    data: ICourseTask[];
    total: 0;
    limit: number;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

export const initialState = {
    lessons: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
    },
    lesson: {
        data: {},
        loading: false,
        sucessful: false,
        error: null,
    },
    item: {
        data: {},
        loading: false,
        sucessful: false,
        error: null,
    },
    courseTasks: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
};
