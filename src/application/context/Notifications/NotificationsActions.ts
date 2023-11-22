import { INotification } from "domain/core/entities/notificationEntity";
import INotificationFailure from "domain/core/failures/notification/notificationFailure";
import NotificationUseCases from "domain/useCases/notification/notificationUseCases";
import { Dispatch } from "react";

export interface INotificationsActions {
  getNotifications: Function;
  readNotifications: Function;
}

const getNotifications = (obj: { userId: string }) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_NOTIFICATIONS_LOADING" });

    let query: Object = {
      userId: obj.userId,
    };

    let sort: Object = {
        readAt: 1
    }

    await new NotificationUseCases()
      .getNotifications({ query, sort })
      .then((res: INotification[]) => {
        dispatch({
          type: "GET_NOTIFICATIONS_SUCESSFUL",
          payload: { data: res, sucessful: true },
        });
      })
      .catch((error: INotificationFailure) => {
        dispatch({ type: "GET_NOTIFICATIONS_ERROR", payload: { error: error } });
      });
  };

  const readNotifications = () => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "READ_NOTIFICATIONS_LOADING" });

    await new NotificationUseCases()
      .readNotifications()
      .then((res: boolean) => {
        dispatch({
          type: "READ_NOTIFICATIONS_SUCESSFUL",
          payload: { sucessful: res },
        });
      })
      .catch((error: INotificationFailure) => {
        dispatch({ type: "READ_NOTIFICATIONS_ERROR", payload: { error: error } });
      });
  };
  

export const actions = {
    getNotifications,
    readNotifications
};
