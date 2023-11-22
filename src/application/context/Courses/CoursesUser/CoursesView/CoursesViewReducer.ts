export const CoursesViewReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_COURSE_LESSONS_SUCESSFUL':
        return {
          ...state,
          lessons: {
            ...state.lessons,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_LESSONS_LOADING':
        return {
          ...state,
          lessons: {
            ...state.lessons,
            data: [],
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_LESSONS_ERROR':
        return {
          ...state,
          lessons: {
            ...state.lessons,
            data: [],
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_COURSE_LESSON_BY_ID_SUCESSFUL':
        return {
          ...state,
          lesson: {
            ...state.lesson,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_LESSON_BY_ID_LOADING':
        return {
          ...state,
          lesson: {
            ...state.lesson,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_LESSON_BY_ID_ERROR':
        return {
          ...state,
          lesson: {
            ...state.lesson,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_COURSE_ITEM_BY_ID_SUCESSFUL':
        return {
          ...state,
          item: {
            ...state.item,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_ITEM_BY_ID_LOADING':
        return {
          ...state,
          item: {
            ...state.item,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_ITEM_BY_ID_ERROR':
        return {
          ...state,
          item: {
            ...state.item,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_COURSE_TASKS_SUCESSFUL':
        return {
          ...state,
          courseTasks: {
            ...state.courseTasks,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_TASKS_LOADING':
        return {
          ...state,
          courseTasks: {
            ...state.courseTasks,
            data: null,
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_TASKS_ERROR':
        return {
          ...state,
          courseTasks: {
            ...state.courseTasks,
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
  