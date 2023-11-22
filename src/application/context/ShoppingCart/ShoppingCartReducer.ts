export const ShoppingCartReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'REMOVE_COURSE_TO_SHOPPING_CART_SUCESSFUL':
        return {
          ...state,
          removeCourseToShoppingCart: {
            ...state.removeCourseToShoppingCart,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'REMOVE_COURSE_TO_SHOPPING_CART_LOADING':
        return {
          ...state,
          removeCourseToShoppingCart: {
            ...state.removeCourseToShoppingCart,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'REMOVE_COURSE_TO_SHOPPING_CART_ERROR':
        return {
          ...state,
          removeCourseToShoppingCart: {
            ...state.removeCourseToShoppingCart,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      default:
        return state;
    }
  };
  