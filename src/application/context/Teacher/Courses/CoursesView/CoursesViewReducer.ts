export const CoursesViewReducer = (state: any, action: any) => {
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

      case 'GET_COURSE_LESSONS_SUCESSFUL':
        return {
          ...state,
          courseLessons: {
            ...state.courseLessons,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_LESSONS_LOADING':
        return {
          ...state,
          courseLessons: {
            ...state.courseLessons,
            data: null,
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_LESSONS_ERROR':
        return {
          ...state,
          courseLessons: {
            ...state.courseLessons,
            data: null,
            total: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_COURSE_ITEMS_SUCESSFUL':
        return {
          ...state,
          courseItems: {
            ...state.courseItems,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_ITEMS_LOADING':
        return {
          ...state,
          courseItems: {
            ...state.courseItems,
            data: null,
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_ITEMS_ERROR':
        return {
          ...state,
          courseItems: {
            ...state.courseItems,
            data: null,
            total: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_COURSE_USERS_SUCESSFUL':
        return {
          ...state,
          courseUsers: {
            ...state.courseUsers,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_COURSE_USERS_LOADING':
        return {
          ...state,
          courseUsers: {
            ...state.courseUsers,
            data: null,
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_COURSE_USERS_ERROR':
        return {
          ...state,
          courseUsers: {
            ...state.courseUsers,
            data: null,
            total: 0,
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

      case 'GET_DELIVERABLES_SUCESSFUL':
        return {
          ...state,
          deliverables: {
            ...state.deliverables,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_DELIVERABLES_LOADING':
        return {
          ...state,
          deliverables: {
            ...state.deliverables,
            data: null,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_DELIVERABLES_ERROR':
        return {
          ...state,
          deliverables: {
            ...state.deliverables,
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
  