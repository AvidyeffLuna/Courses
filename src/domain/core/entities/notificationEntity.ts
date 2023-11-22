export interface INotification {
    notificationId: string;
    teacherId: string;
    userId: string;
    title: string;
    description: string;
    url: string;
    to?: string | null;
    createdAt: Date;
    readAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}
