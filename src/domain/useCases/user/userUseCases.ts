import { IUser } from "domain/core/entities/userEntity";
import { ICreateUsersResponse, IGetUserByIdResponse, IGetUsersResponse } from "domain/core/response/user/userResponsesEntities";
import UserRealmDatasource from "infrastructure/datasources/user/realm/userRealmDatasource";

export default class UserUseCases {
  private _repository: UserRealmDatasource = new UserRealmDatasource();

  async getUsers(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; }): Promise<IGetUsersResponse> {
    try {
      const response = await this._repository.getUsers({ sort: obj.sort, limit: obj.limit, skip: obj.skip, searchQuery: obj.searchQuery });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUsersCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getUsersCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(obj: { userId: string }): Promise<IGetUserByIdResponse> {
    try {
      const response = await this._repository.getUserById({ userId: obj.userId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createUser(obj: { user: IUser; password: string }): Promise<ICreateUsersResponse> {
    try {
      const response = await this._repository.createUser({ user: obj.user, password: obj.password });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
