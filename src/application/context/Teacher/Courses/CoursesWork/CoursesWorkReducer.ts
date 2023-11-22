export const CoursesWorkReducer = (state: any, action: any) => {
    switch (action.type) {
      case "GET_COURSE_BY_ID_SUCESSFUL":
        return {
          ...state,
          courseState: {
            ...state.courseState,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case "GET_COURSE_BY_ID_LOADING":
        return {
          ...state,
          courseState: {
            ...state.courseState,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case "GET_COURSE_BY_ID_ERROR":
        return {
          ...state,
          courseState: {
            ...state.courseState,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_DELIVERABLES_SUCESSFUL':
        return {
          ...state,
          deliverablesState: {
            ...state.deliverablesState,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_DELIVERABLES_LOADING':
        return {
          ...state,
          deliverablesState: {
            ...state.deliverablesState,
            data: null,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_DELIVERABLES_ERROR':
        return {
          ...state,
          deliverablesState: {
            ...state.deliverablesState,
            data: null,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_DELIVERABLE_BY_ID_SUCESSFUL':
        return {
          ...state,
          deliverableState: {
            ...state.deliverableState,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_DELIVERABLE_BY_ID_LOADING':
        return {
          ...state,
          deliverableState: {
            ...state.deliverableState,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_DELIVERABLE_BY_ID_ERROR':
        return {
          ...state,
          deliverableState: {
            ...state.deliverableState,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'CREATE_DELIVERABLE_SUCESSFUL':
        return {
          ...state,
          createDeliverableState: {
            ...state.createDeliverableState,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'CREATE_DELIVERABLE_LOADING':
        return {
          ...state,
          createDeliverableState: {
            ...state.createDeliverableState,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'CREATE_DELIVERABLE_ERROR':
        return {
          ...state,
          createDeliverableState: {
            ...state.createDeliverableState,
            data: {},
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'EDIT_TASK_FINISH_SUCESSFUL':
        return {
          ...state,
          editTaskFinishState: {
            ...state.editTaskFinishState,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'EDIT_TASK_FINISH_LOADING':
        return {
          ...state,
          editTaskFinishState: {
            ...state.editTaskFinishState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'EDIT_TASK_FINISH_ERROR':
        return {
          ...state,
          editTaskFinishState: {
            ...state.editTaskFinishState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  