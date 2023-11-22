export const TeachersCreateReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CREATE_TEACHER_SUCESSFUL':
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
      case 'CREATE_TEACHER_LOADING':
        return {
          ...state,
          teacher: {
            ...state.teacher,
            data: null,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'CREATE_TEACHER_ERROR':
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
  
      default:
        return state;
    }
  };
  