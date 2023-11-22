export const CoursesCreateReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CREATE_COURSE_SUCESSFUL':
        return {
          ...state,
          createCourse: {
            ...state.createCourse,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'CREATE_COURSE_LOADING':
        return {
          ...state,
          createCourse: {
            ...state.createCourse,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'CREATE_COURSE_ERROR':
        return {
          ...state,
          createCourse: {
            ...state.createCourse,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_COURSE_TAGS_SUCESSFUL':
        return {
          ...state,
          courseTags: {
            ...state.courseTags,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_TAGS_LOADING':
        return {
          ...state,
          courseTags: {
            ...state.courseTags,
            data: [],
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_TAGS_ERROR':
        return {
          ...state,
          courseTags: {
            ...state.courseTags,
            data: [],
            total: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };  

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
  
      default:
        return state;
    }
  };
  