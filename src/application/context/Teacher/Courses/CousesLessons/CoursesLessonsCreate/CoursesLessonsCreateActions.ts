import { ICourseLesson } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { ICreateCoursesLessonsResponse, IGetCourseByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseLessonsUseCases from "domain/useCases/course/courseLessonsUseCases";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import { Dispatch } from "react";

export interface ICoursesLessonsCreateActions {
  getCourseById: Function;
  createCourseLesson: Function;
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

const createCourseLesson = (obj: { courseLesson: ICourseLesson }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CREATE_COURSE_LESSON_LOADING" });

    await new CourseLessonsUseCases()
      .createCourseLesson({ courseLesson: obj.courseLesson })
      .then((res: ICreateCoursesLessonsResponse) => {
        dispatch({
          type: "CREATE_COURSE_LESSON_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "CREATE_COURSE_LESSON_ERROR", payload: { error: error } });
      });
  };


export const actions = {
  createCourseLesson,
  getCourseById
};
