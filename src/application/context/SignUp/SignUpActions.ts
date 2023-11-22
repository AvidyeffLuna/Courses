import AuthUseCases from 'domain/useCases/auth/authUseCases';
import { Dispatch } from 'react';

export interface ISignUpActions {
  signUpUser: Function;
  signUpUserWithGoogle: Function;
}

  const signUpUser = (obj: { firstName: string; lastName: string; email: string; password: string; }) => async (dispatch: Dispatch<any>) => { 
    try {
      dispatch({ type: 'SIGN_UP_USER_LOADING' });

      await new AuthUseCases().signUpUser({ firstName: obj.firstName, lastName: obj.lastName, email: obj.email, password: obj.password })
  
      dispatch({
        type: 'SIGN_UP_USER_SUCESSFUL',
        payload: { sucessful: true },
      });

    } catch (error) {
      dispatch({ type: 'SIGN_UP_USER_ERROR', payload: { error: error } });
    }
  };

  const signUpUserWithGoogle = () => async (dispatch: Dispatch<any>) => { 
    try {
      dispatch({ type: 'SIGN_UP_USER_WITH_GOOGLE_LOADING' });

      await new AuthUseCases().signUpWithGoogleUser();
  
      dispatch({
        type: 'SIGN_UP_USER_WITH_GOOGLE_SUCESSFUL',
        payload: { sucessful: true },
      });
    } catch (error) {
      dispatch({ type: 'SIGN_UP_USER_WITH_GOOGLE_ERROR', payload: { error: error } });
    }
  };

export const actions = {
    signUpUser,
    signUpUserWithGoogle,
};
