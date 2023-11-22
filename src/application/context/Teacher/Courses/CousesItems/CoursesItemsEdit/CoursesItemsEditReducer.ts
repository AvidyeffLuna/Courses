export const CoursesItemsEditReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_COURSE_ITEM_BY_ID_SUCESSFUL':
        return {
          ...state,
          courseItem: {
            ...state.courseItem,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_ITEM_BY_ID_LOADING':
        return {
          ...state,
          courseItem: {
            ...state.courseItem,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_ITEM_BY_ID_ERROR':
        return {
          ...state,
          courseItem: {
            ...state.courseItem,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

        
      case 'UPDATE_COURSE_ITEM_SUCESSFUL':
        return {
          ...state,
          editCourseItem: {
            ...state.editCourseItem,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'UPDATE_COURSE_ITEM_LOADING':
        return {
          ...state,
          editCourseItem: {
            ...state.editCourseItem,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'UPDATE_COURSE_ITEM_ERROR':
        return {
          ...state,
          editCourseItem: {
            ...state.editCourseItem,
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
  