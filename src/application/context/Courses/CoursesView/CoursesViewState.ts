import ICourseFailure from "domain/core/failures/course/courseFailure";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";

export interface ICoursesViewState {
    addCourseToShoppingCart: IAddCourseToShoppingCartState;
    addCourseToWhiteList: IAddCourseToWhiteListState;
}

interface IAddCourseToShoppingCartState {
    loading: boolean;
    sucessful: boolean;
    error: IShoppingCartFailure | null;
}

interface IAddCourseToWhiteListState {
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

export const initialState = {
    addCourseToShoppingCart: {
        loading: false,
        sucessful: false,
        error: null,
    },
    addCourseToWhiteList: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
