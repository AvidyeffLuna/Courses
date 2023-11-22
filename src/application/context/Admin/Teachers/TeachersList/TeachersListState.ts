import { ITeacher } from "domain/core/entities/teacherEntity";
import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";

export interface ITeachersListState {
    teachers: IGetTeachersState;
}

interface IGetTeachersState {
    data: ITeacher[];
    total: 0;
    loading: boolean;
    sucessful: boolean;
    error: ITeacherFailure | null;
    limit: number,
}

export const initialState = {
    teachers: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
};
