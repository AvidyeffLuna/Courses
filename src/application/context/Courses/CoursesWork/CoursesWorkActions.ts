import { IDeliverable } from "domain/core/entities/deliverableEntity";
import { INotification } from "domain/core/entities/notificationEntity";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import ICoursesFailure from "domain/core/failures/course/courseFailure";
import DeliverableUseCases from "domain/useCases/deliverable/deliverableUseCases";
import NotificationUseCases from "domain/useCases/notification/notificationUseCases";
import { Dispatch } from "react";
import { IGetCourseByIdResponse, IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import CourseUsersUseCases from "domain/useCases/course/courseUsersUseCases";

export interface ICoursesWorkActions {
    getCourseById: Function;
    getDeliverables: Function;
    getDeliverableById: Function;
    createDeliverable: Function;
}

const getCourseById = (obj: { courseId: string; userId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_COURSE_BY_ID_LOADING" });

    const course: IGetCourseByIdResponse = await new CourseUseCases().getCourseById({
      courseId: obj.courseId,
    });

    await new CourseUsersUseCases()
      .getCourseUserById({ courseId: course.data.courseId, userId: obj.userId })
      .then((res: IGetCourseUserByIdResponse) => {
        dispatch({
          type: "GET_COURSE_BY_ID_SUCESSFUL",
          payload: { data: res.data, sucessful: true },
        });
      })
      .catch((error: ICoursesFailure) => {
        dispatch({ type: "GET_COURSE_BY_ID_ERROR", payload: { error: error } });
      });
  };

  
const getDeliverables = (obj: {
  courseId: string;
  courseTaskId: string;
  userId: string;
  limit?: number | null;
}) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "GET_DELIVERABLES_LOADING" });

  let query: Object = {
    courseId: obj.courseId,
    courseTaskId: obj.courseTaskId,
    userId: obj.userId
  };

  let sort: Object = {
    createdAt: 1
  }

  await new DeliverableUseCases()
    .getDeliverables({ query, sort, limit: obj.limit })
    .then((res: IDeliverable[]) => {
      dispatch({
        type: "GET_DELIVERABLES_SUCESSFUL",
        payload: { data: res.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()), sucessful: true },
      });
    })
    .catch((error: IDeliverableFailure) => {
      dispatch({ type: "GET_DELIVERABLES_ERROR", payload: { error: error } });
    });
};

  const getDeliverableById = (obj: { deliverableId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_DELIVERABLE_BY_ID_LOADING" });

    await new DeliverableUseCases()
      .getDeliverableById({ deliverableId: obj.deliverableId })
      .then((res: IDeliverable) => {
        dispatch({
          type: "GET_DELIVERABLE_BY_ID_SUCESSFUL",
          payload: { data: res, sucessful: true },
        });
      })
      .catch((error: IDeliverableFailure) => {
        dispatch({ type: "GET_DELIVERABLE_BY_ID_ERROR", payload: { error: error } });
      });
  };

const createDeliverable = (obj: { deliverable: IDeliverable, teacherId: string }) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "CREATE_DELIVERABLE_LOADING" });

  await new DeliverableUseCases()
    .createDeliverable({ deliverable: obj.deliverable })
    .then(async (res: IDeliverable) => {
      const course: IGetCourseByIdResponse = await new CourseUseCases().getCourseById({ courseId: res.courseId ?? "" });

      const notification: INotification = {
        notificationId: "",
        userId: "",
        teacherId: obj.teacherId ?? "",
        to: "teacher",
        title: `Nuevo entregable de un estudiante`,
        description: "Tienes una nueva entrega de un estudiante",
        url: `/instructor/curso/${course.data.slug}/tarea/${res.courseTaskId}?userId=${res.userId ?? ""}&deliverable=${res.deliverableId}`,
        createdAt: new Date()
      }

      await new NotificationUseCases().createNotification({ notification });

      dispatch({
        type: "CREATE_DELIVERABLE_SUCESSFUL",
        payload: { data: res, sucessful: true },
      });
    })
    .catch((error: IDeliverableFailure) => {
      dispatch({ type: "CREATE_DELIVERABLE_ERROR", payload: { error: error } });
    });
};

export const actions = {
  getCourseById,
  getDeliverables,
  getDeliverableById,
  createDeliverable
};
