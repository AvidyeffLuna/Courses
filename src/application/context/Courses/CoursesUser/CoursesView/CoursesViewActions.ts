import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCourseItemByIdResponse, IGetCourseLessonByIdResponse, IGetCoursesLessonsResponse, IGetCoursesTasksResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseItemsUseCases from "domain/useCases/course/courseItemsUseCases";
import CourseLessonsUseCases from "domain/useCases/course/courseLessonsUseCases";
import CourseTasksUseCases from "domain/useCases/course/courseTasksUseCases";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import { Dispatch } from "react";

export interface ICoursesViewActions {
  getCourseLessons: Function;
  getCourseLessonById: Function;
  getCourseItemById: Function;
  getCourseTasks: Function;
}

const getCourseLessons = (obj: { courseId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_LESSONS_LOADING" });

    await new CourseLessonsUseCases()
      .getCoursesLessons({ courseId: obj.courseId, sort: { index: 1 } })
      .then((res: IGetCoursesLessonsResponse) => {
        dispatch({
          type: "GET_COURSE_LESSONS_SUCESSFUL",
          payload: { data: res.data.sort((a, b) => a.index - b.index), sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSE_LESSONS_ERROR", payload: { error: error } });
      });
  };  

  const getCourseLessonById = (obj: { courseId: string; courseLessonId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_LESSON_BY_ID_LOADING" });

    await new CourseLessonsUseCases()
      .getCourseLessonById({ courseId: obj.courseId, courseLessonId: obj.courseLessonId })
      .then((res: IGetCourseLessonByIdResponse) => {
        dispatch({
          type: "GET_COURSE_LESSON_BY_ID_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSE_LESSON_BY_ID_ERROR", payload: { error: error } });
      });
  };  

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

  const getCourseTasks = (obj: {
    courseId: string;
    limit?: number | null;
    page?: number | null;
  }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_TASKS_LOADING" });

    const sort: Object = {
      index: 1,
    }

    const skip: number | null = obj.page && obj.limit ? getSkipPagination({ page: obj.page, limit: obj.limit }) : null;

    await new CourseTasksUseCases()
      .getCoursesTasks({
        courseId: obj.courseId,
        sort,
        limit: obj.limit,
        skip,
      })
      .then((res: IGetCoursesTasksResponse) => {
        dispatch({
          type: "GET_COURSE_TASKS_SUCESSFUL",
          payload: { data: res.data.sort((a, b) => a.index - b.index), total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSE_TASKS_ERROR", payload: { error: error } });
      });
  };

export const actions = {
  getCourseLessons,
  getCourseLessonById,
  getCourseItemById,
  getCourseTasks
};
