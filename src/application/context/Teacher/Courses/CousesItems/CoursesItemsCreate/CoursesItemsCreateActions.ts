import { ICourseItem } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesItemsResponse, IGetCourseByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseItemsUseCases from "domain/useCases/course/courseItemsUseCases";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import { Dispatch } from "react";

export interface ICoursesItemsCreateActions {
  getCourseById: Function;
  createCourseItem: Function;
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

const createCourseItem = (obj: { courseItem: ICourseItem }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CREATE_COURSE_ITEM_LOADING" });

    await new CourseItemsUseCases()
      .createCourseItem({ courseItem: obj.courseItem })
      .then((res: ICreateCoursesItemsResponse) => {
        dispatch({
          type: "CREATE_COURSE_ITEM_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "CREATE_COURSE_ITEM_ERROR", payload: { error: error } });
      });
  };


export const actions = {
  createCourseItem,
  getCourseById
};
