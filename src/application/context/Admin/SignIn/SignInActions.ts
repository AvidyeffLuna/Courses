import IAuthFailure from 'domain/core/failures/auth/authFailure';
import AuthUseCases from 'domain/useCases/auth/authUseCases';
import { Dispatch } from 'react';

export interface ISignInActions {
  signInAdmin: Function;
}

const signInAdmin = (obj: { email: string; password: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'SIGN_IN_ADMIN_LOADING' });

    await new AuthUseCases()
      .signInAdmin({ email: obj.email, password: obj.password })
      .then((res: boolean) => {
        dispatch({
          type: 'SIGN_IN_ADMIN_SUCESSFUL',
          payload: { sucessful: res },
        });
      })
      .catch((error: IAuthFailure) => {
        dispatch({ type: 'SIGN_IN_ADMIN_ERROR', payload: { error: error } });
      });
  };

export const actions = {
  signInAdmin,
};
