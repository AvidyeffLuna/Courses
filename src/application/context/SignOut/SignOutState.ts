import IAuthFailure from 'domain/core/failures/auth/authFailure';

export interface ISignOutState {
  signOutUserState: ISignOutUserState;
}

interface ISignOutUserState {
  loading: boolean;
  sucessful: boolean;
  error: IAuthFailure | null;
}

export const initialState = {
  signOutUserState: {
    loading: false,
    sucessful: false,
    error: null,
  },
};
