import { INotification } from "domain/core/entities/notificationEntity";
import INotificationFailure from "domain/core/failures/notification/notificationFailure";

export interface INotificationsState {
    notificationsState: IGetNotificationsState;
    readNotificationsState: IReadNotificationsState;
}

interface IGetNotificationsState {
    data: INotification[];
    loading: boolean;
    sucessful: boolean;
    error: INotificationFailure | null;
}

interface IReadNotificationsState {
    loading: boolean;
    sucessful: boolean;
    error: INotificationFailure | null;
}

export const initialState = {
    notificationsState: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
    },
    readNotificationsState: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
