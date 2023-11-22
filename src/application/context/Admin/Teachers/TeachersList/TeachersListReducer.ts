export const TeachersListReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_TEACHERS_SUCESSFUL':
        return {
          ...state,
          teachers: {
            ...state.teachers,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_TEACHERS_LOADING':
        return {
          ...state,
          teachers: {
            ...state.teachers,
            data: null,
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_TEACHERS_ERROR':
        return {
          ...state,
          teachers: {
            ...state.teachers,
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
  