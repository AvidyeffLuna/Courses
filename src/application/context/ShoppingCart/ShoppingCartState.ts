import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";

export interface IShoppingCartState {
    removeCourseToShoppingCart: IRemoveCourseToShoppingCartState;
}

interface IRemoveCourseToShoppingCartState {
    loading: boolean;
    sucessful: boolean;
    error: IShoppingCartFailure | null;
}

export const initialState = {
    removeCourseToShoppingCart: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
