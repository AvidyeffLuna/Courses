import { IAdmin } from 'domain/core/entities/adminEntity';
import { ITeacher } from 'domain/core/entities/teacherEntity';
import { IUser } from 'domain/core/entities/userEntity';
import IAuthFailure from 'domain/core/failures/auth/authFailure';
import AuthUseCases from 'domain/useCases/auth/authUseCases';
import { Dispatch } from 'react';

export interface IAuthActions {
  getUserAuthenticated: Function;
  getTeacherAuthenticated: Function;
  getAdminAuthenticated: Function;
}

const getUserAuthenticated = (isLoading: boolean) => async (dispatch: Dispatch<any>) => {
  try {
    if (isLoading) dispatch({ type: 'GET_USER_AUTHENTICATED_LOADING' });

    const authenticatedResponse: IUser = await new AuthUseCases().getUserAuthenticated();

    dispatch({
      type: 'GET_USER_AUTHENTICATED_SUCESSFUL',
      payload: { data: authenticatedResponse, sucessful: true },
  });
  } catch (error) {
    dispatch({ type: 'GET_USER_AUTHENTICATED_ERROR', payload: { error: error } });
  }
}

const getTeacherAuthenticated = (isLoading: boolean) => async (dispatch: Dispatch<any>) => {
  try {
    if (isLoading) dispatch({ type: 'GET_TEACHER_AUTHENTICATED_LOADING' });

    const authenticatedResponse: IUser | ITeacher = await new AuthUseCases().getTeacherAuthenticated();

    dispatch({
      type: 'GET_TEACHER_AUTHENTICATED_SUCESSFUL',
      payload: { data: authenticatedResponse, sucessful: true },
  });
  } catch (error) {
    dispatch({ type: 'GET_TEACHER_AUTHENTICATED_ERROR', payload: { error: error } });
  }
}


const getAdminAuthenticated = (isLoading: boolean) => async (dispatch: Dispatch<any>) => {
  if (isLoading) dispatch({ type: 'GET_ADMIN_AUTHENTICATED_LOADING' });

  await new AuthUseCases()
  .getAdminAuthenticated()
  .then((res: IAdmin) => {
      dispatch({
          type: 'GET_ADMIN_AUTHENTICATED_SUCESSFUL',
          payload: { data: res, sucessful: true },
      });
  })
  .catch((error: IAuthFailure) => {
      dispatch({ type: 'GET_USER_AUTHENTICATED_ERROR', payload: { error: error } });
  });
};

export const actions = {
  getUserAuthenticated,
  getTeacherAuthenticated,
  getAdminAuthenticated
};
