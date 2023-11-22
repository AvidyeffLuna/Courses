import { IUser } from "domain/core/entities/userEntity";
import IUserFailure from "domain/core/failures/user/userFailure";

export interface IUsersListState {
    users: IGetUsersState;
}

interface IGetUsersState {
    data: IUser[];
    total: 0;
    loading: boolean;
    sucessful: boolean;
    error: IUserFailure | null;
    limit: number,
}

export const initialState = {
    users: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
};
