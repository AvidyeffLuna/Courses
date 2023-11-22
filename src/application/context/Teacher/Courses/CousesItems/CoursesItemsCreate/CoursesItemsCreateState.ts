import { ICourse, ICourseItem } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesItemsCreateState {
    course: IGetCourseByIdState;
    createCourseItem: ICreateCourseItemState;
}

interface IGetCourseByIdState {
    data: ICourse;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}


interface ICreateCourseItemState {
    data: ICourseItem;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
    limit: number,
}

export const initialState = {
    course: {
        data: {} as ICourse,
        loading: false,
        sucessful: false,
        error: null,
    },
    createCourseItem: {
        data: {} as ICourseItem,
        loading: false,
        sucessful: false,
        error: null,
    },
};
