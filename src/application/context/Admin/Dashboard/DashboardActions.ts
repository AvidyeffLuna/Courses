import ISaleFailure from "domain/core/failures/sale/saleFailure";
import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";
import IUserFailure from "domain/core/failures/user/userFailure";
import SaleUseCases from "domain/useCases/sale/saleUseCases";
import TeacherUseCases from "domain/useCases/teacher/teacherUseCase";
import UserUseCases from "domain/useCases/user/userUseCases";
import { Dispatch } from "react";

export interface IDashboardActions {
  getUsersQuantity: Function;
  getTeachersQuantity: Function;
  getPaymentsQuantity: Function;
  getPaymentsApprovedQuantity: Function;
  getPaymentsRejectedQuantity: Function;
}

const getUsersQuantity = () => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_USERS_LOADING" });

    await new UserUseCases()
      .getUsersCount({ })
      .then((res: number) => {
        dispatch({
          type: "GET_USERS_SUCESSFUL",
          payload: { data: res, sucessful: true },
        });
      })
      .catch((error: IUserFailure) => {
        dispatch({ type: "GET_USERS_ERROR", payload: { error: error } });
      });
};
  
const getTeachersQuantity = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "GET_TEACHERS_LOADING" });

  await new TeacherUseCases()
    .getTeachersCount({ })
    .then((res: number) => {
      dispatch({
        type: "GET_TEACHERS_SUCESSFUL",
        payload: { data: res, sucessful: true },
      });
    })
    .catch((error: ITeacherFailure) => {
      dispatch({ type: "GET_TEACHERS_ERROR", payload: { error: error } });
    });
};

const getPaymentsQuantity = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "GET_SALES_LOADING" });

  await new SaleUseCases()
    .getSalesCount({ })
    .then((res: number) => {
      dispatch({
        type: "GET_SALES_SUCESSFUL",
        payload: { data: res, sucessful: true },
      });
    })
    .catch((error: ISaleFailure) => {
      dispatch({ type: "GET_SALES_ERROR", payload: { error: error } });
    });
};

const getPaymentsApprovedQuantity = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "GET_PAYMENTS_APPROVED_LOADING" });

  await new SaleUseCases()
    .getSalesCount({ query: { status: "approved" } })
    .then((res: number) => {
      dispatch({
        type: "GET_PAYMENTS_APPROVED_SUCESSFUL",
        payload: { data: res, sucessful: true },
      });
    })
    .catch((error: IUserFailure) => {
      dispatch({ type: "GET_PAYMENTS_APPROVED_ERROR", payload: { error: error } });
    });
};

const getPaymentsRejectedQuantity = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "GET_PAYMENTS_REJECTED_LOADING" });

  await new SaleUseCases()
    .getSalesCount({ query: { status: "approved" } })
    .then((res: number) => {
      dispatch({
        type: "GET_PAYMENTS_REJECTED_SUCESSFUL",
        payload: { data: res, sucessful: true },
      });
    })
    .catch((error: IUserFailure) => {
      dispatch({ type: "GET_PAYMENTS_REJECTED_ERROR", payload: { error: error } });
    });
};

export const actions = {
    getUsersQuantity,
    getTeachersQuantity,
    getPaymentsQuantity,
    getPaymentsApprovedQuantity,
    getPaymentsRejectedQuantity,
};
