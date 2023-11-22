export const PaymentMobileReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CREATE_PAYMENT_SUCESSFUL':
        return {
          ...state,
          createPayment: {
            ...state.createPayment,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'CREATE_PAYMENT_LOADING':
        return {
          ...state,
          createPayment: {
            ...state.createPayment,
            data: {},
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'CREATE_PAYMENT_ERROR':
        return {
          ...state,
          createPayment: {
            ...state.createPayment,
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
  