export const SignInReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SIGN_IN_USER_SUCESSFUL':
        return {
          ...state,
          signInUserState: {
            ...state.signInUserState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'SIGN_IN_USER_LOADING':
        return {
          ...state,
          signInUserState: {
            ...state.signInUserState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'SIGN_IN_USER_ERROR':
        return {
          ...state,
          signInUserState: {
            ...state.signInUserState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'SIGN_IN_USER_WITH_GOOGLE_SUCESSFUL':
        return {
          ...state,
          signInUserWithGoogleState: {
            ...state.signInUserWithGoogleState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'SIGN_IN_USER_WITH_GOOGLE_LOADING':
        return {
          ...state,
          signInUserWithGoogleState: {
            ...state.signInUserWithGoogleState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'SIGN_IN_USER_WITH_GOOGLE_ERROR':
        return {
          ...state,
          signInUserWithGoogleState: {
            ...state.signInUserWithGoogleState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  