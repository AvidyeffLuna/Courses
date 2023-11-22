import { ICourse, ICourseTask } from "./courseEntity";
import { IFile } from "./fileEntity";
import { IMedia } from "./mediaEntity";
import { ITeacher } from "./teacherEntity";
import { IUser } from "./userEntity";

export interface IDeliverable {
    deliverableId: string;
    courseId?: string | null;
    course?: ICourse | null;
    courseTaskId: string;
    courseTask?: ICourseTask | null;
    userId?: string | null;
    user?: IUser | null;
    teacherId?: string | null;
    teacher?: ITeacher | null;
    title: string;
    description: string;
    files?: IFile[] | null;
    mediaList?: IMedia[] | null;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    readAt?: Date | null;
}