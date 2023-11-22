import { ICourse } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";

export interface IDashboardState {
    courses: IGetCoursesState;
}

interface IGetCoursesState {
    data: number;
    loading: boolean;
    sucessful: boolean;
    error: ICourseFailure | null;
}

export const initialState = {
    courses: {
        data: 0,
        loading: false,
        sucessful: false,
        error: null,
    },
};
