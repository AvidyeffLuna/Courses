import { ICourseItem } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCourseItemByIdResponse } from "domain/core/response/course/courseResponsesEntities";

export interface ICoursesItemsEditState {
    courseItem: IGetCourseItemByIdState;
    editCourseItem: IEditCourseItemState;
}

interface IGetCourseItemByIdState {
    data: ICourseItem;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}


interface IEditCourseItemState {
    data: ICourseItem;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

export const initialState = {
    courseItem: {
        data: {} as ICourseItem,
        loading: false,
        sucessful: false,
        error: null,
    },
    editCourseItem: {
        data: {} as ICourseItem,
        loading: false,
        sucessful: false,
        error: null,
    },
};
