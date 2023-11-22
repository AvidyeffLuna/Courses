import IAuthFailure from 'domain/core/failures/auth/authFailure';

export interface ISignUpState {
  signUpUserState: ISignUpUserState;
  signUpUserWithGoogleState: ISignUpUserWithGoogleState;
}

interface ISignUpUserState {
  loading: boolean;
  sucessful: boolean;
  error: IAuthFailure | null;
}

interface ISignUpUserWithGoogleState {
  loading: boolean;
  sucessful: boolean;
  error: IAuthFailure | null;
}

export const initialState = {
  signUpUserState: {
    loading: false,
    sucessful: false,
    error: null,
  },
  signUpUserWithGoogleState: {
    loading: false,
    sucessful: false,
    error: null,
  },
};
