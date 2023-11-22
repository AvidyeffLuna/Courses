import IAuthFailure from 'domain/core/failures/auth/authFailure';

export interface ISignInState {
    signInAdminState: ISignInAdminState;
}

interface ISignInAdminState {
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

export const initialState = {
    signInAdminState: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
