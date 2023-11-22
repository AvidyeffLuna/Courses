import { ICourse } from "domain/core/entities/courseEntity";
import { IShoppingCart, IShoppingCartPaidSummary } from "domain/core/entities/shoppingCartEntity";
import { IResponseMetadata } from "../responseEntity";

export interface IGetShoppingCartsResponse {
    data: IShoppingCart[];
    metadata: IResponseMetadata;
}

export interface IGetShoppingCartByIdResponse {
    data: {
        shoppingCart: IShoppingCart,
        courses: ICourse[],
        paidSummary: IShoppingCartPaidSummary,
    };
    metadata: IResponseMetadata;
}

export interface ICreateShoppingCartsResponse {
    data: IShoppingCart;
    metadata: IResponseMetadata;
}

export interface IAddCourseToShoppingCartResponse {
    data: null;
    metadata: IResponseMetadata;
}

export interface IRemoveCourseToShoppingCartResponse {
    data: null;
    metadata: IResponseMetadata;
}
