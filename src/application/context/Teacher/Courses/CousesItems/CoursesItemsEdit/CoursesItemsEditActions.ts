import { ICourseItem } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCourseItemByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseItemsUseCases from "domain/useCases/course/courseItemsUseCases";
import { Dispatch } from "react";

export interface ICoursesItemsEditActions {
  getCourseItemById: Function;
  editCourseItem: Function;
}

const getCourseItemById = (obj: { courseLessonId: string; courseItemId: string }) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "GET_COURSE_ITEM_BY_ID_LOADING" });

  await new CourseItemsUseCases()
    .getCourseItemById({ courseLessonId: obj.courseLessonId, courseItemId: obj.courseItemId })
    .then((res: IGetCourseItemByIdResponse) => {
      dispatch({
        type: "GET_COURSE_ITEM_BY_ID_SUCESSFUL",
        payload: { data: res.data, sucessful: true },
      });
    })
    .catch((error: ICourseFailure) => {
      dispatch({ type: "GET_COURSE_ITEM_BY_ID_ERROR", payload: { error: error } });
    });
};  

const editCourseItem = (obj: { courseItem: ICourseItem }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "UPDATE_COURSE_ITEM_LOADING" });

    await new CourseItemsUseCases()
      .editCourseItem({ courseItem: obj.courseItem })
      .then((res: ICourseItem) => {
        dispatch({
          type: "UPDATE_COURSE_ITEM_SUCESSFUL",
          payload: { data: res, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "UPDATE_COURSE_ITEM_ERROR", payload: { error: error } });
      });
  };


export const actions = {
  editCourseItem,
  getCourseItemById
};
