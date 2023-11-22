export const CoursesViewReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'ADD_COURSE_TO_SHOPPING_CART_SUCESSFUL':
        return {
          ...state,
          addCourseToShoppingCart: {
            ...state.addCourseToShoppingCart,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'ADD_COURSE_TO_SHOPPING_CART_LOADING':
        return {
          ...state,
          addCourseToShoppingCart: {
            ...state.addCourseToShoppingCart,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'ADD_COURSE_TO_SHOPPING_CART_ERROR':
        return {
          ...state,
          addCourseToShoppingCart: {
            ...state.addCourseToShoppingCart,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      case 'ADD_COURSE_TO_WHITE_LIST_SUCESSFUL':
        return {
          ...state,
          addCourseToWhiteList: {
            ...state.addCourseToWhiteList,
            loading: false,
            sucessful: action.payload.sucessful,
            error: null,
          },
        };
      case 'ADD_COURSE_TO_WHITE_LIST_LOADING':
        return {
          ...state,
          addCourseToWhiteList: {
            ...state.addCourseToWhiteList,
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'ADD_COURSE_TO_WHITE_LIST_ERROR':
        return {
          ...state,
          addCourseToWhiteList: {
            ...state.addCourseToWhiteList,
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };

      default:
        return state;
    }
  };
  