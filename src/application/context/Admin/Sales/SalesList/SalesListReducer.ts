export const SalesListReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_SALES_SUCESSFUL':
        return {
          ...state,
          sales: {
            ...state.sales,
            data: action.payload.data,
            total: action.payload.total,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'GET_SALES_LOADING':
        return {
          ...state,
          sales: {
            ...state.sales,
            data: null,
            total: 0,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_SALES_ERROR':
        return {
          ...state,
          sales: {
            ...state.sales,
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
  