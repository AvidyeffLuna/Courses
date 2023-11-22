import IUserFailure from "domain/core/failures/sale/saleFailure";
import { IGetUsersResponse } from "domain/core/response/user/userResponsesEntities";
import UserUseCases from "domain/useCases/user/userUseCases";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import { Dispatch } from "react";

export interface IUsersListActions {
  getUsers: Function;
}

const getUsers = (obj: {
    page?: number | null;
    searchQuery?: string | null;
    limit?: number | null;
}) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_USERS_LOADING" });

    let sort = {
      createdAt: -1
    };

    const skip: number | null = obj.page && obj.limit ? getSkipPagination({ page: obj.page, limit: obj.limit }) : null;

    await new UserUseCases()
      .getUsers({ sort, skip, limit: obj.limit, searchQuery: obj.searchQuery })
      .then((res: IGetUsersResponse) => {
        dispatch({
          type: "GET_USERS_SUCESSFUL",
          payload: { data: res.data, total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: IUserFailure) => {
        dispatch({ type: "GET_USERS_ERROR", payload: { error: error } });
      });
};
  

export const actions = {
    getUsers,
};
