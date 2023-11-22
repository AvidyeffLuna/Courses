import IAuthFailure from 'domain/core/failures/auth/authFailure';
import AuthUseCases from 'domain/useCases/auth/authUseCases';
import { Dispatch } from 'react';

export interface IAuthWithGoogleActions {
    createUserWithGoogle: Function;
}

const createUserWithGoogle = () => async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'AUTH_WITH_GOOGLE_LOADING' });

    await new AuthUseCases()
      .createUserWithGoogle()
      .then((res: boolean) => {
        dispatch({
          type: 'AUTH_WITH_GOOGLE_SUCESSFUL',
          payload: { sucessful: res },
        });
      })
      .catch((error: IAuthFailure) => {
        dispatch({ type: 'AUTH_WITH_GOOGLE_ERROR', payload: { error: error } });
      });
  };

export const actions = {
createUserWithGoogle,
};
