export const SignOutReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SIGN_OUT_USER_SUCESSFUL':
        return {
          ...state,
          signOutUserState: {
            ...state.signOutUserState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'SIGN_OUT_USER_LOADING':
        return {
          ...state,
          signOutUserState: {
            ...state.signOutUserState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'SIGN_OUT_USER_ERROR':
        return {
          ...state,
          signOutUserState: {
            ...state.signOutUserState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  