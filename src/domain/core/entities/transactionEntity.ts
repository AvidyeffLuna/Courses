import { ISale } from "./saleEntity";
import { IUser } from "./userEntity";

export interface ITransaction {
    transactionId: string;
    userId: string;
    saleId?: string | null;
    sale?: ISale | null;
    user?: IUser | null;   
    amount: number;
    amountBs: number;
    status: string;
    createdAt: Date;
    approvedAt?: Date | null;
    rejectedAt?: Date | null;
}
