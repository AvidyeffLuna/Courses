import { IUser } from "domain/core/entities/userEntity";
import IUserFailure from "domain/core/failures/user/userFailure";

export interface IUsersCreateState {
    user: ICreateUsersState;
}

interface ICreateUsersState {
    data: IUser;
    loading: boolean;
    sucessful: boolean;
    error: IUserFailure | null;
}

export const initialState = {
    user: {
        data: {} as IUser,
        loading: false,
        sucessful: false,
        error: null,
    },
};
