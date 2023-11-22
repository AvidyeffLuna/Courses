import { IDeliverable } from "domain/core/entities/deliverableEntity";
import { ICourse, ICourseUser } from "domain/core/entities/courseEntity";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import IProjectFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesWorkState {
    courseState: IGetProjectByIdState;
    deliverablesState: IGetDeliverablesState;
    deliverableState: IGetDeliverableByIdState;
    createDeliverableState: ICreateDeliverableState;
}

interface IGetProjectByIdState {
    data: ICourseUser;
    loading: boolean;
    sucessful: boolean;
    error: IProjectFailure | null;
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
};
