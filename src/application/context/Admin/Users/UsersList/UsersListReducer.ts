export const UsersListReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_USERS_SUCESSFUL':
        return {
          ...state,
          users: {
            ...state.users,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_USERS_LOADING':
        return {
          ...state,
          users: {
            ...state.users,
            data: null,
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_USERS_ERROR':
        return {
          ...state,
          users: {
            ...state.users,
            data: null,
            total: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  