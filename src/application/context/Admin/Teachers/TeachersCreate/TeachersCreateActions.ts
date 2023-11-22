import { ITeacher } from "domain/core/entities/teacherEntity";
import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";
import { ICreateTeachersResponse } from "domain/core/response/teacher/teacherResponsesEntities";
import TeacherUseCases from "domain/useCases/teacher/teacherUseCase";
import { Dispatch } from "react";

export interface ITeachersCreateActions {
  createTeacher: Function;
}

const createTeacher = (obj: {
    teacher: ITeacher,
    password: string;
}) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CREATE_TEACHER_LOADING" });

    await new TeacherUseCases()
      .createTeacher({ teacher: obj.teacher, password: obj.password })
      .then((res: ICreateTeachersResponse) => {
        dispatch({
          type: "CREATE_TEACHER_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: ITeacherFailure) => {
        dispatch({ type: "CREATE_TEACHER_ERROR", payload: { error: error } });
      });
};


export const actions = {
    createTeacher,
};
