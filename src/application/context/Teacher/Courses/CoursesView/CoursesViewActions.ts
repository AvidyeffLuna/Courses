import { IDeliverable } from "domain/core/entities/deliverableEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import { IGetCourseByIdResponse, IGetCoursesItemsResponse, IGetCoursesLessonsResponse, IGetCoursesTasksResponse, IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseItemsUseCases from "domain/useCases/course/courseItemsUseCases";
import CourseLessonsUseCases from "domain/useCases/course/courseLessonsUseCases";
import CourseTasksUseCases from "domain/useCases/course/courseTasksUseCases";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import CourseUsersUseCases from "domain/useCases/course/courseUsersUseCases";
import DeliverableUseCases from "domain/useCases/deliverable/deliverableUseCases";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import { Dispatch } from "react";

export interface ICoursesViewActions {
    getCourseById: Function;
    getCourseLessons: Function;
    getCourseItems: Function;
    getCourseUsers: Function;
    getCourseTasks: Function;
    getDeliverables: Function;
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

  const getCourseLessons = (obj: {
    courseId: string;
    searchQuery?: string | null;
  }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_LESSONS_LOADING" });

    let sort = {
      index: 1
    };

    await new CourseLessonsUseCases()
      .getCoursesLessons({ sort, courseId: obj.courseId, searchQuery: obj.searchQuery })
      .then((res: IGetCoursesLessonsResponse) => {
        dispatch({
          type: "GET_COURSE_LESSONS_SUCESSFUL",
          payload: { data: res.data.sort((a, b) => a.index - b.index), total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSE_LESSONS_ERROR", payload: { error: error } });
      });
  };

  const getCourseItems = (obj: {
    courseId: string;
    courseLessonId: string;
  }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_ITEMS_LOADING" });

    let sort = {
      index: 1
    };

    await new CourseItemsUseCases()
      .getCoursesItems({ sort, courseId: obj.courseId, courseLessonId: obj.courseLessonId })
      .then((res: IGetCoursesItemsResponse) => {
        dispatch({
          type: "GET_COURSE_ITEMS_SUCESSFUL",
          payload: { data: res.data.sort((a, b) => a.index - b.index), total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSE_ITEMS_ERROR", payload: { error: error } });
      });
  };

  const getCourseUsers = (obj: {
    courseId: string;
  }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_USERS_LOADING" });

 
    await new CourseUsersUseCases()
      .getCoursesUsers({
        courseId: obj.courseId,
      })
      .then((res: IGetCoursesUsersResponse) => {
        dispatch({
          type: "GET_COURSE_USERS_SUCESSFUL",
          payload: { data: res.data, total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ICourseFailure) => {
        dispatch({ type: "GET_COURSE_USERS_ERROR", payload: { error: error } });
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

  const getDeliverables = (obj: {
    courseId: string;
    status?: string | null;
    limit?: number | null;
  }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_DELIVERABLES_LOADING" });
  
    let query: Object = {
      courseId: obj.courseId,
      teacherId: null,
    };

    if (obj.status && obj.status === "pending") query = { ...query, readAt: null };

    if (obj.status && obj.status === "view") query = { ...query, readAt: { $ne: null } };
  
    let sort: Object = {
      createdAt: 1
    }
  
    await new DeliverableUseCases()
      .getDeliverables({ query, sort, limit: obj.limit })
      .then((res: IDeliverable[]) => {
        dispatch({
          type: "GET_DELIVERABLES_SUCESSFUL",
          payload: { data: res, sucessful: true },
        });
      })
      .catch((error: IDeliverableFailure) => {
        dispatch({ type: "GET_DELIVERABLES_ERROR", payload: { error: error } });
      });
  };

export const actions = {
    getCourseById,
    getCourseLessons,
    getCourseItems,
    getCourseUsers,
    getCourseTasks,
    getDeliverables
};
