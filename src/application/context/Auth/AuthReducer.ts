export const AuthReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_USER_AUTHENTICATED_SUCESSFUL':
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
      case 'GET_USER_AUTHENTICATED_LOADING':
        return {
          ...state,
          user: {
            ...state.user,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_USER_AUTHENTICATED_ERROR':
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

      case 'GET_TEACHER_AUTHENTICATED_SUCESSFUL':
        return {
          ...state,
          teacher: {
            ...state.teacher,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_TEACHER_AUTHENTICATED_LOADING':
        return {
          ...state,
          teacher: {
            ...state.teacher,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_TEACHER_AUTHENTICATED_ERROR':
        return {
          ...state,
          teacher: {
            ...state.teacher,
            data: null,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_ADMIN_AUTHENTICATED_SUCESSFUL':
        return {
          ...state,
          admin: {
            ...state.admin,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_ADMIN_AUTHENTICATED_LOADING':
        return {
          ...state,
          admin: {
            ...state.admin,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_ADMIN_AUTHENTICATED_ERROR':
        return {
          ...state,
          admin: {
            ...state.admin,
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
  