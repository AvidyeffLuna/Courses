import { IFile } from "./fileEntity";

export interface IAdmin {
    adminId: string;
    firstName: string;
    lastName: string;
    profilePictureUrl?: string | null;
    profilePicture?: IFile | null;
    email: string;
    messagingToken?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
    lastSessionAt?: Date | null;
}