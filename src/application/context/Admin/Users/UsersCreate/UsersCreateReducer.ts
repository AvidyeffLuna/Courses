export const UsersCreateReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CREATE_USER_SUCESSFUL':
        return {
          ...state,
          user: {
            ...state.user,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'CREATE_USER_LOADING':
        return {
          ...state,
          user: {
            ...state.user,
            data: null,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'CREATE_USER_ERROR':
        return {
          ...state,
          user: {
            ...state.user,
            data: null,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  