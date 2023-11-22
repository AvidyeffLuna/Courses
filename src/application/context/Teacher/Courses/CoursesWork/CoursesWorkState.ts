import { IDeliverable } from "domain/core/entities/deliverableEntity";
import { ICourse, ICourseUser } from "domain/core/entities/courseEntity";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesWorkState {
    courseState: IGetCourseByIdState;
    deliverablesState: IGetDeliverablesState;
    deliverableState: IGetDeliverableByIdState;
    createDeliverableState: ICreateDeliverableState;
    editTaskFinishState: IEditTaskFinishState;
}

interface IGetCourseByIdState {
    data: ICourseUser;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

interface IGetDeliverableByIdState {
    data: IDeliverable;
    loading: boolean;
    sucessful: boolean;
    error: IDeliverableFailure | null;
}

interface IGetDeliverablesState {
    data: IDeliverable[];
    loading: boolean;
    sucessful: boolean;
    error: IDeliverableFailure | null;
    limit: number,
}

interface ICreateDeliverableState {
    data: IDeliverable;
    loading: boolean;
    sucessful: boolean;
    error: IDeliverableFailure | null;
    limit: number,
}

interface IEditTaskFinishState {
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

export const initialState = {
    courseState: {
        data: {} as ICourse,
        loading: false,
        sucessful: false,
        error: null,
    },
    deliverableState: {
        data: {} as IDeliverable,
        loading: false,
        sucessful: false,
        error: null,
    },
    deliverablesState: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 999,
    },
    createDeliverableState: {
        data: {} as IDeliverable,
        loading: false,
        sucessful: false,
        error: null,
    },
    editTaskFinishState: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
