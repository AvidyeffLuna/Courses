import { IFile } from "./fileEntity";

export interface ITeacher {
    teacherId: string;
    firstName: string;
    lastName: string;
    profilePictureUrl?: string | null;
    profilePicture?: IFile | null;
    email: string;
    provider: string;
    phoneCountryCode?: number | null;
    phoneOperatorCode?: number | null;
    phoneNumber?: string;
    genrer: string;
    documentType: string;
    documentNumber: string;
    messagingToken?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
    lastSessionAt?: Date | null;
}