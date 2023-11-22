import { IShoppingCart } from "domain/core/entities/shoppingCartEntity";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { IAddCourseToShoppingCartResponse, IGetShoppingCartByIdResponse, IGetShoppingCartsResponse, IRemoveCourseToShoppingCartResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";

export default interface IShoppingCartRepository {
  getShoppingCarts(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; }): Promise<IGetShoppingCartsResponse | IShoppingCartFailure>;
  getShoppingCartsCount(obj: { query?: Object | null; }): Promise<number | IShoppingCartFailure>;
  getShoppingCartById(obj: { shoppingCartId: string }): Promise<IGetShoppingCartByIdResponse | IShoppingCartFailure>;
  getShoppingCartByUserId(obj: { userId: string }): Promise<IGetShoppingCartByIdResponse | IShoppingCartFailure>;
  addCourseToShoppingCart(obj: { courseId: string }): Promise<IAddCourseToShoppingCartResponse | IShoppingCartFailure>;
  removeCourseToShoppingCart(obj: { courseId: string }): Promise<IRemoveCourseToShoppingCartResponse | IShoppingCartFailure>;
  editShoppingCart(obj: { shoppingCart: IShoppingCart }): Promise<IShoppingCart | IShoppingCartFailure>;
  editCoursesShoppingCart(obj: { courses: string[] }): Promise<boolean | IShoppingCartFailure>;
}
