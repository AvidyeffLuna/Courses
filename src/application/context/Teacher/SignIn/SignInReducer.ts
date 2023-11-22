export const SignInTeacherReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SIGN_IN_TEACHER_SUCESSFUL':
        return {
          ...state,
          signInTeacher: {
            ...state.signInTeacher,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'SIGN_IN_TEACHER_LOADING':
        return {
          ...state,
          signInTeacher: {
            ...state.signInTeacher,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'SIGN_IN_TEACHER_ERROR':
        return {
          ...state,
          signInTeacher: {
            ...state.signInTeacher,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      default:
        return state;
    }
  };
  