import { IFile } from "./fileEntity";
import { IUser } from "./userEntity";

export interface ISale {
    saleId: string;
    userId: string;
    user?: IUser | null;   
    courses?: string[] | null; 
    paymentMethod: string;
    documentNumber?: string;
    documentType?: string;
    phoneOperatorCode?: string;
    phoneNumber?: string;
    reference: string;
    mainPictureUrl?: string | null;
    mainPicture?: IFile | null;
    amount: number;
    amountBs: number;
    status: string;
    type: string;
    createdAt: Date;
    approvedAt?: Date | null;
    rejectedAt?: Date | null;
}
