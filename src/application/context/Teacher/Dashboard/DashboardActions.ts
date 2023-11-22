import ICourseFailure from "domain/core/failures/course/courseFailure";
import CoursesUseCases from "domain/useCases/course/courseUseCases";
import { Dispatch } from "react";

export interface IDashboardActions {
  getCoursesQuantity: Function;
}

const getCoursesQuantity = (obj: { teacherId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSES_LOADING" });

    await new CoursesUseCases()
      .getCoursesCount({ query: { teacherId: obj.teacherId } })
      .then((res: number) => {
        dispatch({
          type: "GET_COURSES_SUCESSFUL",
          payload: { data: res, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSES_ERROR", payload: { error: error } });
      });
};
  

export const actions = {
    getCoursesQuantity,
};
