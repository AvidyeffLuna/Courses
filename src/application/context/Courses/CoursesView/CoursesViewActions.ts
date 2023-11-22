import ICourseFailure from "domain/core/failures/course/courseFailure";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { IAddCourseToShoppingCartResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import ShoppingCartUseCases from "domain/useCases/shoppingCart/shoppingCartUseCases";
import { Dispatch } from "react";

export interface ICoursesViewActions {
  addCourseToShoppingCart: Function;
  addCourseToWhiteList: Function;
}

const addCourseToShoppingCart = (obj: { courseId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "ADD_COURSE_TO_SHOPPING_CART_LOADING" });

    await new ShoppingCartUseCases()
      .addCourseToShoppingCart({ courseId: obj.courseId })
      .then((res: IAddCourseToShoppingCartResponse) => {
        dispatch({
          type: "ADD_COURSE_TO_SHOPPING_CART_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: IShoppingCartFailure) => {
        dispatch({ type: "ADD_COURSE_TO_SHOPPING_CART_ERROR", payload: { error: error } });
      });
  };  

  const addCourseToWhiteList = (obj: { userId: string; courseId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "ADD_COURSE_TO_WHITE_LIST_LOADING" });

    await new CourseUseCases()
      .addCourseWhiteList({ userId: obj.userId, courseId: obj.courseId })
      .then((res: boolean) => {
        dispatch({
          type: "ADD_COURSE_TO_WHITE_LIST_SUCESSFUL",
          payload: { sucessful: res },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "ADD_COURSE_TO_WHITE_LIST_ERROR", payload: { error: error } });
      });
  };  

export const actions = {
  addCourseToShoppingCart,
  addCourseToWhiteList
};
