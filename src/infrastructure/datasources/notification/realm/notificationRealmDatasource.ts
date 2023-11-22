import { ITeacher } from "domain/core/entities/teacherEntity";
import { IUser } from "domain/core/entities/userEntity";
import { INotification } from "domain/core/entities/notificationEntity";
import INotificationFailure from "domain/core/failures/notification/notificationFailure";
import { teacherRealmDataToEntity } from "domain/mappers/teacher/realm/teacherRealmMapper";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";
import { fromGetNotificationsFailureRealmMapper, fromReadNotificationsFailureRealmMapper } from "domain/mappers/failures/notification/realm/notificationRealmFailuresMapper";
import { notificationFromRealmToDocumentData, notificationRealmDataToEntity } from "domain/mappers/notification/realm/notificationRealmMapper";
import { SERVER_KEY } from "infrastructure/config/firebase/firebase-client";
import { FCM_CLOUD_SEND_MESSAGE_URL } from "infrastructure/config/firebase/firebase-messaging";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import INotificationRepository from "infrastructure/repositories/notification/notificationRepository";
import { nanoid } from "nanoid";

export default class NotificationRealmDatasource implements INotificationRepository {
  async getNotifications(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<INotification[] | INotificationFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Notifications");

      const notifications: INotification[] = [];

      const data = await collection.aggregate([
        { $match: obj.query },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      const notificationsJSON = JSON.parse(JSON.stringify(data));

      if (notificationsJSON.length > 0) {
        notificationsJSON.forEach((notification: any) => {
            const notificationMap: INotification = notificationRealmDataToEntity(notification);

            if (notificationMap.notificationId.length > 0) notifications.push(notificationMap);
        });
      }

      return notifications;
    } catch (error) {
      const exception = error as any; 
      return fromGetNotificationsFailureRealmMapper(exception.error);
    }
  }

  async getNotificationsWatch(obj: { query?: Object | null }): Promise<INotification | string | INotificationFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Notifications");

      const notification: INotification | string = "";

      for await (const change of collection.watch()) {
        let breakAsyncIterator = false;
        switch (change.operationType) {
          case "insert": {
            breakAsyncIterator = true;
            break;
          }

          case "update": {
            breakAsyncIterator = true;
            break;
          }
        }
        if (breakAsyncIterator) break;
      }

      return notification;
    } catch (error) {
      const exception = error as any; 
      return fromGetNotificationsFailureRealmMapper(exception.error);
    }
  }

  async createNotification(obj: { notification: INotification }): Promise<INotification | INotificationFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Notifications");

      obj.notification.notificationId = obj.notification.notificationId.length === 0 ? nanoid(20) : obj.notification.notificationId;
      obj.notification.createdAt = new Date();

      collection.insertOne(notificationFromRealmToDocumentData(obj.notification));

      if (obj.notification.to !== "admin") {
        const collectionTeacher = mongo.db(DATABASE_NAME).collection("Teachers");
        const collectionUsers = mongo.db(DATABASE_NAME).collection("Users");

        const teacherData = await collectionTeacher.findOne({ _id: obj.notification.userId });

        let messageObject = {};

        if (teacherData) {
          const teacherMap: ITeacher = teacherRealmDataToEntity(teacherData);

          messageObject = {
            "to": teacherMap.messagingToken,
            "data": {
                "notificationId": obj.notification.notificationId,
                "title": obj.notification.title,
                'message': obj.notification.description,
            }
          }
        } else {
          const userData = await collectionUsers.findOne({ _id: obj.notification.userId });

          if (userData) {
            const userMap: IUser = userRealmDataToEntity(userData);

            messageObject = {
              "to": userMap.messagingToken,
              "data": {
                  "notificationId": obj.notification.notificationId,
                  "title": obj.notification.title,
                  'message': obj.notification.description,
              }
            }
          }
        }

        await fetch(FCM_CLOUD_SEND_MESSAGE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${SERVER_KEY}`,
          },
          body: JSON.stringify(messageObject),
        });
      }

      return obj.notification;
    } catch (error) {
      const exception = error as any; 
      return fromReadNotificationsFailureRealmMapper(exception.error ?? exception.message);
    }
  }

  async readNotifications(): Promise<boolean | INotificationFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Notifications");

      collection.updateMany(
        { userId: currentUser.id, readAt: null },
        { $set: { readAt: new Date() } }
      );

      return true;
    } catch (error) {
      const exception = error as any; 
      return fromReadNotificationsFailureRealmMapper(exception.error ?? exception.message);
    }
  }

  async readNotificationsTeacher(): Promise<boolean | INotificationFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Notifications");

      collection.updateMany(
        { teacherId: currentUser.id, readAt: null },
        { $set: { readAt: new Date() } }
      );

      return true;
    } catch (error) {
      const exception = error as any; 
      return fromReadNotificationsFailureRealmMapper(exception.error ?? exception.message);
    }
  }

  async readNotificationsAdmin(): Promise<boolean | INotificationFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Notifications");

      collection.updateMany(
        { to: "admin", readAt: null },
        { $set: { readAt: new Date() } }
      );

      return true;
    } catch (error) {
      const exception = error as any; 
      return fromReadNotificationsFailureRealmMapper(exception.error ?? exception.message);
    }
  }
}
