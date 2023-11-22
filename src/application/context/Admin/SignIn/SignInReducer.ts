export const SignInReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SIGN_IN_ADMIN_SUCESSFUL':
        return {
          ...state,
          signInAdminState: {
            ...state.signInAdminState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'SIGN_IN_ADMIN_LOADING':
        return {
          ...state,
          signInAdminState: {
            ...state.signInAdminState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'SIGN_IN_ADMIN_ERROR':
        return {
          ...state,
          signInAdminState: {
            ...state.signInAdminState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  