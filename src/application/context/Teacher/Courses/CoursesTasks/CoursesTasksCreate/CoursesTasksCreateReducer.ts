export const CoursesTasksCreateReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_COURSE_BY_ID_SUCESSFUL':
        return {
          ...state,
          course: {
            ...state.course,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_BY_ID_LOADING':
        return {
          ...state,
          course: {
            ...state.course,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_BY_ID_ERROR':
        return {
          ...state,
          course: {
            ...state.course,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

        
      case 'CREATE_COURSE_TASK_SUCESSFUL':
        return {
          ...state,
          createCourseTask: {
            ...state.createCourseTask,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'CREATE_COURSE_TASK_LOADING':
        return {
          ...state,
          createCourseTask: {
            ...state.createCourseTask,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'CREATE_COURSE_TASK_ERROR':
        return {
          ...state,
          createCourseTask: {
            ...state.createCourseTask,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  