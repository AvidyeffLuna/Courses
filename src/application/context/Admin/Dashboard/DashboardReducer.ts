export const DashboardReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_USERS_SUCESSFUL':
        return {
          ...state,
          totalUsers: {
            ...state.totalUsers,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_USERS_LOADING':
        return {
          ...state,
          totalUsers: {
            ...state.totalUsers,
            data: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_USERS_ERROR':
        return {
          ...state,
          totalUsers: {
            ...state.totalUsers,
            data: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_TEACHERS_SUCESSFUL':
        return {
          ...state,
          totalTeachers: {
            ...state.totalTeachers,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_TEACHERS_LOADING':
        return {
          ...state,
          totalTeachers: {
            ...state.totalTeachers,
            data: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_TEACHERS_ERROR':
        return {
          ...state,
          totalTeachers: {
            ...state.totalTeachers,
            data: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_PAYMENTS_SUCESSFUL':
        return {
          ...state,
          totalPayments: {
            ...state.totalPayments,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_PAYMENTS_LOADING':
        return {
          ...state,
          totalPayments: {
            ...state.totalPayments,
            data: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_PAYMENTS_ERROR':
        return {
          ...state,
          totalPayments: {
            ...state.totalPayments,
            data: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_PAYMENTS_APPROVED_SUCESSFUL':
        return {
          ...state,
          totalPaymentsApproved: {
            ...state.totalPaymentsApproved,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_PAYMENTS_APPROVED_LOADING':
        return {
          ...state,
          totalPaymentsApproved: {
            ...state.totalPaymentsApproved,
            data: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_PAYMENTS_APPROVED_ERROR':
        return {
          ...state,
          totalPaymentsApproved: {
            ...state.totalPaymentsApproved,
            data: 0,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'GET_PAYMENTS_REJECTED_SUCESSFUL':
        return {
          ...state,
          totalPaymentsRejected: {
            ...state.totalPaymentsRejected,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_PAYMENTS_REJECTED_LOADING':
        return {
          ...state,
          totalPaymentsRejected: {
            ...state.totalPaymentsRejected,
            data: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_PAYMENTS_REJECTED_ERROR':
        return {
          ...state,
          totalPaymentsRejected: {
            ...state.totalPaymentsRejected,
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
  