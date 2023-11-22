import { ICourse, ICourseItem, ICourseLesson, ICourseTask, ICourseUser } from "domain/core/entities/courseEntity";
import { IDeliverable } from "domain/core/entities/deliverableEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";

export interface ICoursesViewState {
    course: IGetCourseByIdState;
    courseLessons: IGetCourseLessonsState;
    courseItems: IGetCourseItemsState;
    courseUsers: IGetCourseUsersState;
    courseTasks: IGetCourseTasksState;
    deliverables: IGetDeliverablesState;
}

interface IGetCourseByIdState {
    data: ICourse;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetCourseLessonsState {
    data: ICourseLesson[];
    total: 0;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetCourseItemsState {
    data: ICourseItem[];
    total: 0;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetCourseUsersState {
    data: ICourseUser[];
    total: 0;
    limit: number;
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

interface IGetDeliverablesState {
    data: IDeliverable[];
    loading: boolean;
    sucessful: boolean;
    error: IDeliverableFailure | null;
    limit: number,
}

export const initialState = {
    course: {
        data: {} as ICourse,
        loading: false,
        sucessful: false,
        error: null,
    },
    courseLessons: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
    },
    courseItems: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
    },
    courseUsers: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
    courseTasks: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
    deliverables: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
};
