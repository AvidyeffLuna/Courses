import IAuthFailure from 'domain/core/failures/auth/authFailure';
import AuthUseCases from 'domain/useCases/auth/authUseCases';
import { Dispatch } from 'react';

export interface ISignInTeacherActions {
  signInTeacher: Function;
}

const signInTeacher = (obj: { email: string; password: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'SIGN_IN_TEACHER_LOADING' });

    await new AuthUseCases()
      .signInTeacher({ email: obj.email, password: obj.password })
      .then((res: boolean) => {
        dispatch({
          type: 'SIGN_IN_TEACHER_SUCESSFUL',
          payload: { sucessful: res },
        });
      })
      .catch((error: IAuthFailure) => {
        dispatch({ type: 'SIGN_IN_TEACHER_ERROR', payload: { error: error } });
      });
  };

export const actions = {
  signInTeacher,
};
