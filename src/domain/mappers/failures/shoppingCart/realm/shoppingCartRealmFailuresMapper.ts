import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { addCourseToShoppingCartFailures, createShoppingCartFailures, getShoppingCartFailures, getShoppingCartsFailures, removeCourseToShoppingCartFailures } from "../shoppingCartFailures";

export function fromGetShoppingCartsFailureRealmMapper(message: string): IShoppingCartFailure {
    const failure: IShoppingCartFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getShoppingCartsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetShoppingCartFailureRealmMapper(message: string): IShoppingCartFailure {
    const failure: IShoppingCartFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getShoppingCartFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateShoppingCartFailureRealmMapper(message: string): IShoppingCartFailure {
    const failure: IShoppingCartFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = createShoppingCartFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromAddCourseToShoppingCartFailureRealmMapper(message: string): IShoppingCartFailure {
    const failure: IShoppingCartFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = addCourseToShoppingCartFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromRemoveCourseToShoppingCartFailureRealmMapper(message: string): IShoppingCartFailure {
    const failure: IShoppingCartFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = removeCourseToShoppingCartFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}
