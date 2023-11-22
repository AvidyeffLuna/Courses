import { IAdmin } from 'domain/core/entities/adminEntity';
import { ITeacher } from 'domain/core/entities/teacherEntity';
import { IUser } from 'domain/core/entities/userEntity';
import IAuthFailure from 'domain/core/failures/auth/authFailure';

export interface IAuthState {
    user: IGetUserAuthenticatedState;
    teacher: IGetTeacherAuthenticatedState;
    admin: IGetAdminAuthenticatedState;
}

interface IGetUserAuthenticatedState {
    data: IUser | null;
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

interface IGetTeacherAuthenticatedState {
    data: ITeacher | null;
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

interface IGetAdminAuthenticatedState {
    data: IAdmin | null;
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

export const initialState = {
    user: {
        data: null,
        loading: false,
        sucessful: false,
        error: null,
    },
    teacher: {
        data: null,
        loading: false,
        sucessful: false,
        error: null,
    },
    admin: {
        data: null,
        loading: false,
        sucessful: false,
        error: null,
    },
};
