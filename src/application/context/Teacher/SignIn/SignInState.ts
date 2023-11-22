import IAuthFailure from 'domain/core/failures/auth/authFailure';

export interface ISignInTeacherState {
    signInTeacher: ISignInState;
}

interface ISignInState {
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

export const initialState = {
    signInTeacher: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
