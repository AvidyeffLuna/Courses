import { ISale } from "domain/core/entities/saleEntity";
import { ITransaction } from "domain/core/entities/transactionEntity";
import SaleUseCases from "domain/useCases/sale/saleUseCases";
import ShoppingCartUseCases from "domain/useCases/shoppingCart/shoppingCartUseCases";
import TransactionUseCases from "domain/useCases/transaction/transactionUseCases";
import { Dispatch } from "react";

export interface IPaymentBankTransferActions {
  createPayment: Function;
}

const createPayment = (obj: { sale: ISale }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "CREATE_PAYMENT_LOADING" });

        await new SaleUseCases().createSale({ sale: obj.sale });

        await new ShoppingCartUseCases().editCoursesShoppingCart({ courses: [] });

        const transaction: ITransaction = {
            transactionId: "",
            userId: "",
            saleId: obj.sale.saleId,
            amount: obj.sale.amount,
            amountBs: obj.sale.amountBs,
            status: obj.sale.status,
            createdAt: new Date()
        }

        const res = await new TransactionUseCases().createTransaction({ transaction: transaction });
        
        dispatch({
            type: "CREATE_PAYMENT_SUCESSFUL",
            payload: { data: res.data, sucessful: true },
        });
    } catch (error) {
        dispatch({ type: "CREATE_PAYMENT_ERROR", payload: { error: error } });
    }    
};  


export const actions = {
  createPayment
};
