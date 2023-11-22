import { IUser } from "domain/core/entities/userEntity";
import IUserFailure from "domain/core/failures/user/userFailure";
import { ICreateUsersResponse } from "domain/core/response/user/userResponsesEntities";
import UsersUseCases from "domain/useCases/user/userUseCases";
import { Dispatch } from "react";

export interface IUsersCreateActions {
  createUser: Function;
}

const createUser = (obj: {
    user: IUser,
    password: string;
}) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CREATE_USER_LOADING" });

    await new UsersUseCases()
      .createUser({ user: obj.user, password: obj.password })
      .then((res: ICreateUsersResponse) => {
        dispatch({
          type: "CREATE_USER_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: IUserFailure) => {
        dispatch({ type: "CREATE_USER_ERROR", payload: { error: error } });
      });
};


export const actions = {
    createUser,
};
