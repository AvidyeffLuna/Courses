export const NotificationsReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_NOTIFICATIONS_SUCESSFUL':
        return {
          ...state,
          notificationsState: {
            ...state.notificationsState,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_NOTIFICATIONS_LOADING':
        return {
          ...state,
          notificationsState: {
            ...state.notificationsState,
            data: [],
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_NOTIFICATIONS_ERROR':
        return {
          ...state,
          notificationsState: {
            ...state.notificationsState,
            data: [],
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      case 'READ_NOTIFICATIONS_SUCESSFUL':
        return {
          ...state,
          readNotificationsState: {
            ...state.readNotificationsState,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'READ_NOTIFICATIONS_LOADING':
        return {
          ...state,
          readNotificationsState: {
            ...state.readNotificationsState,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'READ_NOTIFICATIONS_ERROR':
        return {
          ...state,
          readNotificationsState: {
            ...state.readNotificationsState,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  