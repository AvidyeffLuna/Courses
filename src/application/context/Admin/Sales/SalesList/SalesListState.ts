import { ISale } from "domain/core/entities/saleEntity";
import ISaleFailure from "domain/core/failures/sale/saleFailure";

export interface ISalesListState {
    sales: IGetSalesState;
}

interface IGetSalesState {
    data: ISale[];
    total: 0;
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
    limit: number,
}

export const initialState = {
    sales: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
        limit: 10,
    },
};
