import IAuthFailure from 'domain/core/failures/auth/authFailure';
import AuthUseCases from 'domain/useCases/auth/authUseCases';
import { Dispatch } from 'react';

export interface ISignOutActions {
  signOutUser: Function;
}

const signOutUser = () => async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'SIGN_OUT_USER_LOADING' });

    await new AuthUseCases()
      .signOutUser()
      .then((res: boolean) => {
        dispatch({
          type: 'SIGN_OUT_USER_SUCESSFUL',
          payload: { sucessful: res },
        });
      })
      .catch((error: IAuthFailure) => {
        dispatch({ type: 'SIGN_OUT_USER_ERROR', payload: { error: error } });
      });
  };

export const actions = {
    signOutUser,
};
