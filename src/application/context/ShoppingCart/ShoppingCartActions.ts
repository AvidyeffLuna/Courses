import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { IRemoveCourseToShoppingCartResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import ShoppingCartUseCases from "domain/useCases/shoppingCart/shoppingCartUseCases";
import { Dispatch } from "react";

export interface IShoppingCartActions {
  removeCourseToShoppingCart: Function;
}

const removeCourseToShoppingCart = (obj: { courseId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "REMOVE_COURSE_TO_SHOPPING_CART_LOADING" });

    await new ShoppingCartUseCases()
      .removeCourseToShoppingCart({ courseId: obj.courseId })
      .then((res: IRemoveCourseToShoppingCartResponse) => {
        dispatch({
          type: "REMOVE_COURSE_TO_SHOPPING_CART_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: IShoppingCartFailure) => {
        dispatch({ type: "REMOVE_COURSE_TO_SHOPPING_CART_ERROR", payload: { error: error } });
      });
  };  


export const actions = {
  removeCourseToShoppingCart
};
