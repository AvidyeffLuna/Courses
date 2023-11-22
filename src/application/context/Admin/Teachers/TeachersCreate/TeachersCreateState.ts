import { ITeacher } from "domain/core/entities/teacherEntity";
import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";

export interface ITeachersCreateState {
    teacher: ICreateTeachersState;
}

interface ICreateTeachersState {
    data: ITeacher;
    loading: boolean;
    sucessful: boolean;
    error: ITeacherFailure | null;
}

export const initialState = {
    teacher: {
        data: {} as ITeacher,
        loading: false,
        sucessful: false,
        error: null,
    },
};
