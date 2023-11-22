import IAuthFailure from 'domain/core/failures/auth/authFailure';

export interface ISignInState {
    signInUserState: ISignInUserState;
    signInUserWithGoogleState: ISignInUserWithGoogleState;
}

interface ISignInUserState {
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

interface ISignInUserWithGoogleState {
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

export const initialState = {
    signInUserState: {
        loading: false,
        sucessful: false,
        error: null,
    },
    signInUserWithGoogleState: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
