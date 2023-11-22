import { INotification } from "domain/core/entities/notificationEntity";

export function notificationRealmDataToEntity(data: any): INotification {
  return {
    notificationId: data?._id ?? "",
    userId: data?.userId ?? "",
    teacherId: data?.teacherId ?? "",
    title: data?.title ?? "",
    description: data?.description ?? "",
    url: data?.url ?? "",
    to: data?.to ?? "",
    createdAt: data?.createdAt ? new Date(data.createdAt) : new Date(),
    readAt: data?.readAt ? new Date(data.readAt) : null,
    updatedAt: data?.updatedAt ? new Date(data.updatedAt) : null,
    deletedAt: data?.deletedAt ? new Date(data.deletedAt) : null,
  } as INotification;
}

export function notificationFromRealmToDocumentData(notification: INotification): any {
  const documentData = {
    _id: notification.notificationId,
    userId: notification.userId,
    teacherId: notification.teacherId,
    title: notification.title,
    to: notification.to,
    description: notification.description,
    url: notification.url,
    createdAt: notification.createdAt,
    readAt: notification.readAt,
    updatedAt: notification.updatedAt,
    deletedAt: notification.deletedAt,
  };

  return documentData;
}
