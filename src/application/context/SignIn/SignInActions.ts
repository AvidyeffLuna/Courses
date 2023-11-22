import IAuthFailure from 'domain/core/failures/auth/authFailure';
import AuthUseCases from 'domain/useCases/auth/authUseCases';
import { Dispatch } from 'react';

export interface ISignInActions {
  signInUser: Function;
  signInUserWithGoogle: Function;
}

const signInUser = (obj: { email: string; password: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'SIGN_IN_USER_LOADING' });

    await new AuthUseCases()
      .signInUser({ email: obj.email, password: obj.password })
      .then((res: boolean) => {
        dispatch({
          type: 'SIGN_IN_USER_SUCESSFUL',
          payload: { sucessful: res },
        });
      })
      .catch((error: IAuthFailure) => {
        dispatch({ type: 'SIGN_IN_USER_ERROR', payload: { error: error } });
      });
  };

  const signInUserWithGoogle = () => async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'SIGN_IN_USER_WITH_GOOGLE_LOADING' });

    await new AuthUseCases()
      .signInUserWithGoogle()
      .then((res: boolean) => {
        dispatch({
          type: 'SIGN_IN_USER_WITH_GOOGLE_SUCESSFUL',
          payload: { sucessful: res },
        });
      })
      .catch((error: IAuthFailure) => {
        dispatch({ type: 'SIGN_IN_USER_WITH_GOOGLE_ERROR', payload: { error: error } });
      });
  };

export const actions = {
  signInUser,
  signInUserWithGoogle,
};
