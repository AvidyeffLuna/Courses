import { ICourse } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesResponse, IGetCourseByIdResponse, IGetCoursesTagResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import { Dispatch } from "react";

export interface ICoursesCreateActions {
  createCourse: Function;
  getCourseById: Function;
  getCourseTags: Function;
}

const createCourse = (obj: { course: ICourse }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CREATE_COURSE_LOADING" });

    await new CourseUseCases()
      .createCourse({ course: obj.course })
      .then((res: ICreateCoursesResponse) => {
        dispatch({
          type: "CREATE_COURSE_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "CREATE_COURSE_ERROR", payload: { error: error } });
      });
  };

  const getCourseTags = () => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_TAGS_LOADING" });
  
    await new CourseUseCases()
      .getCoursesTags({ query: {} })
      .then((res: IGetCoursesTagResponse) => {
        dispatch({
          type: "GET_COURSE_TAGS_SUCESSFUL",
          payload: { data: res.data, total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSE_TAGS_ERROR", payload: { error: error } });
      });
  };

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


export const actions = {
  createCourse,
  getCourseById,
  getCourseTags
};
