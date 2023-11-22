export const SalesViewReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_SALE_BY_ID_SUCESSFUL':
        return {
          ...state,
          sale: {
            ...state.sale,
            data: action.payload.data,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_SALE_BY_ID_LOADING':
        return {
          ...state,
          sale: {
            ...state.sale,
            data: null,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_SALE_BY_ID_ERROR':
        return {
          ...state,
          sale: {
            ...state.sale,
            data: null,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

        case 'UPDATE_APPROVED_SALE_SUCESSFUL':
        return {
          ...state,
          approvedSale: {
            ...state.approvedSale,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'UPDATE_APPROVED_SALE_LOADING':
        return {
          ...state,
          approvedSale: {
            ...state.approvedSale,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'UPDATE_APPROVED_SALE_ERROR':
        return {
          ...state,
          approvedSale: {
            ...state.approvedSale,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'UPDATE_REJECTED_SALE_SUCESSFUL':
        return {
          ...state,
          rejectedSale: {
            ...state.rejectedSale,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'UPDATE_REJECTED_SALE_LOADING':
        return {
          ...state,
          rejectedSale: {
            ...state.rejectedSale,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'UPDATE_REJECTED_SALE_ERROR':
        return {
          ...state,
          rejectedSale: {
            ...state.rejectedSale,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  