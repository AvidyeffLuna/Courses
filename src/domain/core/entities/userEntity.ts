import { IFile } from "./fileEntity";

export interface IUser {
    userId: string;
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
    favouritesCourses: string[];
    messagingToken?: string | null;
    state?: string | null;
    location?: string | null;
    address?: string | null;
    birthDate?: Date | null;
    createdAt: Date;
    updatedAt?: Date | null;
    lastSessionAt?: Date | null;
    emailVerifiedAt?: Date | null;
}