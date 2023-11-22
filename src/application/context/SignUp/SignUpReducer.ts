export const SignUpReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SIGN_UP_USER_SUCESSFUL':
        return {
          ...state,
          signUpUserState: {
            ...state.signUpUserState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'SIGN_UP_USER_LOADING':
        return {
          ...state,
          signUpUserState: {
            ...state.signUpUserState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'SIGN_UP_USER_ERROR':
        return {
          ...state,
          signUpUserState: {
            ...state.signUpUserState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'SIGN_UP_USER_WITH_GOOGLE_SUCESSFUL':
        return {
          ...state,
          signUpUserWithGoogleState: {
            ...state.signUpUserWithGoogleState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'SIGN_UP_USER_WITH_GOOGLE_LOADING':
        return {
          ...state,
          signUpUserWithGoogleState: {
            ...state.signUpUserWithGoogleState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'SIGN_UP_USER_WITH_GOOGLE_ERROR':
        return {
          ...state,
          signUpUserWithGoogleState: {
            ...state.signUpUserWithGoogleState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  