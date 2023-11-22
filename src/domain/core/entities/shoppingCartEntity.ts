import { IUser } from "./userEntity";

export interface IShoppingCart {
    shoppingCartId: string;
    userId: string;
    user?: IUser | null;   
    courses: string[]; 
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
    disabledAt?: Date | null;
}

export interface IShoppingCartPaidSummary {
    coursesQuantity: number;
    totalPaid: number;
}
