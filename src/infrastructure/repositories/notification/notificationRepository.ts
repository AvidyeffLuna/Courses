import { INotification } from "domain/core/entities/notificationEntity";
import INotificationFailure from "domain/core/failures/notification/notificationFailure";

export default interface INotificationRepository {
  getNotifications(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<INotification[] | INotificationFailure>;
  createNotification(obj: { notification: INotification }): Promise<INotification | INotificationFailure>;
  readNotifications(): Promise<boolean | INotificationFailure>;
  readNotificationsAdmin(): Promise<boolean | INotificationFailure>;
  readNotificationsTeacher(): Promise<boolean | INotificationFailure>
}
