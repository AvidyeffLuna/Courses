import ISaleFailure from "domain/core/failures/sale/saleFailure";
import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";
import IUserFailure from "domain/core/failures/user/userFailure";


export interface IDashboardState {
    totalUsers: IGetTotalUsersState;
    totalTeachers: IGetTotalTeachersState;
    totalPayments: IGetTotalPaymentsState;
    totalPaymentsApproved: IGetTotalPaymentsApprovedState;
    totalPaymentsRejected: IGetTotalPaymentsRejectedState;
}

interface IGetTotalUsersState {
    data: number;
    loading: boolean;
    sucessful: boolean;
    error: IUserFailure | null;
}

interface IGetTotalTeachersState {
    data: number;
    loading: boolean;
    sucessful: boolean;
    error: ITeacherFailure | null;
}

interface IGetTotalPaymentsState {
    data: number;
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
}

interface IGetTotalPaymentsApprovedState {
    data: number;
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
}

interface IGetTotalPaymentsRejectedState {
    data: number;
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
}

export const initialState = {
    totalUsers: {
        data: 0,
        loading: false,
        sucessful: false,
        error: null,
    },
    totalTeachers: {
        data: 0,
        loading: false,
        sucessful: false,
        error: null,
    },
    totalPayments: {
        data: 0,
        loading: false,
        sucessful: false,
        error: null,
    },
    totalPaymentsApproved: {
        data: 0,
        loading: false,
        sucessful: false,
        error: null,
    },
    totalPaymentsRejected: {
        data: 0,
        loading: false,
        sucessful: false,
        error: null,
    },
};
