import { INotification } from "domain/core/entities/notificationEntity";
import NotificationRealmDatasource from "infrastructure/datasources/notification/realm/notificationRealmDatasource";

export default class NotificationUseCases {
  private _repository: NotificationRealmDatasource =
    new NotificationRealmDatasource();

  async getNotifications(obj: {
    query?: Object | null;
    sort?: Object | null;
    limit?: number | null;
  }): Promise<INotification[]> {
    try {
      const response = await this._repository.getNotifications({
        query: obj.query,
        sort: obj.sort,
        limit: obj.limit,
      });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNotification(obj: {
    notification: INotification;
  }): Promise<INotification> {
    try {
      const response = await this._repository.createNotification({
        notification: obj.notification,
      });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async readNotifications(): Promise<boolean> {
    try {
      const response = await this._repository.readNotifications();

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async readNotificationsTeacher(): Promise<boolean> {
    try {
      const response = await this._repository.readNotificationsTeacher();

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async readNotificationsAdmin(): Promise<boolean> {
    try {
      const response = await this._repository.readNotificationsAdmin();

      if (typeof response !== "boolean") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
