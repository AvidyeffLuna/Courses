import { IShoppingCart } from "domain/core/entities/shoppingCartEntity";
import { IAddCourseToShoppingCartResponse, ICreateShoppingCartsResponse, IGetShoppingCartByIdResponse, IGetShoppingCartsResponse, IRemoveCourseToShoppingCartResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import ShoppingCartRealmDatasource from "infrastructure/datasources/shoppingCart/realm/shoppingCartRealmDatasource";

export default class ShoppingCartUseCases {
  private _repository: ShoppingCartRealmDatasource = new ShoppingCartRealmDatasource();

  async getShoppingCarts(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; }): Promise<IGetShoppingCartsResponse> {
    try {
      const response = await this._repository.getShoppingCarts({ sort: obj.sort, limit: obj.limit, skip: obj.skip });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getShoppingCartsCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getShoppingCartsCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getShoppingCartById(obj: { shoppingCartId: string }): Promise<IGetShoppingCartByIdResponse> {
    try {
      const response = await this._repository.getShoppingCartById({ shoppingCartId: obj.shoppingCartId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getShoppingCartByUserId(obj: { userId: string }): Promise<IGetShoppingCartByIdResponse> {
    try {
      const response = await this._repository.getShoppingCartByUserId({ userId: obj.userId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async addCourseToShoppingCart(obj: { courseId: string }): Promise<IAddCourseToShoppingCartResponse> {
    try {
      const response = await this._repository.addCourseToShoppingCart({ courseId: obj.courseId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async removeCourseToShoppingCart(obj: { courseId: string }): Promise<IRemoveCourseToShoppingCartResponse> {
    try {
      const response = await this._repository.removeCourseToShoppingCart({ courseId: obj.courseId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editShoppingCart(obj: { shoppingCart: IShoppingCart }): Promise<IShoppingCart> {
    try {
      const response = await this._repository.editShoppingCart({ shoppingCart: obj.shoppingCart });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editCoursesShoppingCart(obj: { courses: string[] }): Promise<boolean> {
    try {
      const response = await this._repository.editCoursesShoppingCart({ courses: obj.courses });

      if (typeof response !== "boolean") throw response;

      return true;
    } catch (error) {
      throw error;
    }
  }
}
