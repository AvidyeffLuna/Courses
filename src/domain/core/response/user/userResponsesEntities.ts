import { IUser } from "domain/core/entities/userEntity";
import { IResponseMetadata } from "../responseEntity";

export interface IGetUsersResponse {
    data: IUser[];
    metadata: IResponseMetadata;
}

export interface IGetUserByIdResponse {
    data: IUser;
    metadata: IResponseMetadata;
}

export interface ICreateUsersResponse {
    data: IUser;
    metadata: IResponseMetadata;
}
