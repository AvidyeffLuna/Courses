import { IUser } from "domain/core/entities/userEntity";
import IUserFailure from "domain/core/failures/user/userFailure";
import { ICreateUsersResponse, IGetUserByIdResponse, IGetUsersResponse } from "domain/core/response/user/userResponsesEntities";

export default interface IUserRepository {
  getUsers(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetUsersResponse | IUserFailure>;
  getUsersCount(obj: { query?: Object | null; }): Promise<number | IUserFailure>;
  getUserById(obj: { userId: string }): Promise<IGetUserByIdResponse | IUserFailure>;
  createUser(obj: { user: IUser; password: string }): Promise<ICreateUsersResponse | IUserFailure>;
}
