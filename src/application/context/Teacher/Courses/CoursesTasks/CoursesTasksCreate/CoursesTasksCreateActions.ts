import { ICourseTask } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesTasksResponse, IGetCourseByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseTasksUseCases from "domain/useCases/course/courseTasksUseCases";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import { Dispatch } from "react";

export interface ICoursesTasksCreateActions {
  getCourseById: Function;
  createCourseTask: Function;
}

const getCourseById = (obj: { courseId: string }) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "GET_COURSE_BY_ID_LOADING" });

  await new CourseUseCases()
    .getCourseById({ courseId: obj.courseId })
    .then((res: IGetCourseByIdResponse) => {
      dispatch({
        type: "GET_COURSE_BY_ID_SUCESSFUL",
        payload: { data: res.data, sucessful: true },
      });
    })
    .catch((error: ICourseFailure) => {
      dispatch({ type: "GET_COURSE_BY_ID_ERROR", payload: { error: error } });
    });
};  

const createCourseTask = (obj: { courseTask: ICourseTask }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CREATE_COURSE_TASK_LOADING" });

    await new CourseTasksUseCases()
      .createCourseTask({ courseTask: obj.courseTask })
      .then((res: ICreateCoursesTasksResponse) => {
        dispatch({
          type: "CREATE_COURSE_TASK_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "CREATE_COURSE_TASK_ERROR", payload: { error: error } });
      });
  };


export const actions = {
  createCourseTask,
  getCourseById
};
