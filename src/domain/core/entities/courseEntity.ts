import { IFile } from "./fileEntity";
import { IMedia } from "./mediaEntity";
import { ITeacher } from "./teacherEntity";
import { IUser } from "./userEntity";

export interface ICourseTag {
    courseTagId: string;
    name: string;
    createdAt: Date;
}

export interface ICourseUserTask {
    taskId: string;
    isCompleted: boolean;
    score?: number | null;
    note?: string | null;
    completedAt?: Date | null;
}

export interface ICourseUser {
    courseUserId: string;
    userId: string;
    user?: IUser | null;
    courseId: string;
    course?: ICourse | null;
    tasks: ICourseUserTask[];
    isCompleted: boolean;
    createdAt: Date;
    completedAt?: Date | null;
}

export interface ICourseTask {
    courseTaskId: string;
    courseId: string;
    title: string;
    index: number;
    description: string;
    files?: IFile[] | null;
    mediaList: IMedia[];
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    disabledAt?: Date | null;
}

export interface ICourseItem {
    courseItemId: string;
    courseLessonId: string;
    courseLesson?: ICourseLesson;
    courseId: string;
    course?: ICourse | null;
    title: string;
    index: number;
    description: string;
    mainVideoUrl: string;
    mainVideo?: IFile | null;
    files?: IFile[] | null;
    mediaList: IMedia[];
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    disabledAt?: Date | null;
}

export interface ICourseLesson {
    courseLessonId: string;
    courseId: string;
    course?: ICourse | null;
    title: string;
    index: number;
    description: string;
    items: number;
    itemsList?: ICourseItem[];
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    disabledAt?: Date | null;
}

export interface ICourse {
    courseId: string;
    teacherId: string;
    teacher?: ITeacher | null;
    name: string;
    slug: string;
    initCourseDate: Date;
    price: number;
    items: number;
    tasks: number;
    lessons: number;
    students: number;
    isBuying?: boolean;
    description: string;
    countRatings: number;
    totalRatings: number;
    inShoppingCart?: boolean;
    tags: string[];
    views: number;
    isFavorite?: boolean | null;
    favorite: number;
    keywords: string[];
    mainVideoUrl: string;
    mainVideo?: IFile | null;
    mainPictureUrl: string;
    mainPicture?: IFile | null;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    disabledAt?: Date | null;
}
