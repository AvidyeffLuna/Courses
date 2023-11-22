import { ICourse } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface ICoursesListState {
    courses: IGetCoursesState;
}

interface IGetCoursesState {
    data: ICourse[];
    total: 0;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
    limit: number,
}

export const initialState = {
    courses: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
};
