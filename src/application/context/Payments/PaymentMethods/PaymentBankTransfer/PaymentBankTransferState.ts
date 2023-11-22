import { ITransaction } from "domain/core/entities/transactionEntity";
import ISaleFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";

export interface IPaymentBankTransferState {
    createPayment: ICreatePaymentState;
}

interface ICreatePaymentState {
    data: ITransaction;
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
}

export const initialState = {
    createPayment: {
        data: {} as ITransaction,
        loading: false,
        sucessful: false,
        error: null,
    },
};
