import IAuthFailure from 'domain/core/failures/auth/authFailure';

export interface IAuthWithGoogleStates {
    authWithGoogleState: IAuthWithGoogleState;
}

interface IAuthWithGoogleState {
    loading: boolean;
    sucessful: boolean;
    error: IAuthFailure | null;
}

export const initialState = {
    authWithGoogleState: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
