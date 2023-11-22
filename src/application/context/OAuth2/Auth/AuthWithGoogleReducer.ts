export const AuthWithGoogleReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'AUTH_WITH_GOOGLE_SUCESSFUL':
        return {
          ...state,
          authWithGoogleState: {
            ...state.authWithGoogleState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'AUTH_WITH_GOOGLE_LOADING':
        return {
          ...state,
          authWithGoogleState: {
            ...state.authWithGoogleState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'AUTH_WITH_GOOGLE_ERROR':
        return {
          ...state,
          authWithGoogleState: {
            ...state.authWithGoogleState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  