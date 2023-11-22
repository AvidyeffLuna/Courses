import INotificationFailure from "domain/core/failures/notification/notificationFailure";
import { createNotificationFailures, getNotificationsFailures, readNotificationsFailures } from "../notificationFailures";

export function fromGetNotificationsFailureRealmMapper(message: string): INotificationFailure {
    const failure: INotificationFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getNotificationsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateNotificationFailureRealmMapper(message: string): INotificationFailure {
    const failure: INotificationFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = createNotificationFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromReadNotificationsFailureRealmMapper(message: string): INotificationFailure {
    const failure: INotificationFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = readNotificationsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

