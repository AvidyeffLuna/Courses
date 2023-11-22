export const DashboardReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_COURSES_SUCESSFUL':
        return {
          ...state,
          courses: {
            ...state.courses,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSES_LOADING':
        return {
          ...state,
          courses: {
            ...state.courses,
            data: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSES_ERROR':
        return {
          ...state,
          courses: {
            ...state.courses,
            data: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  