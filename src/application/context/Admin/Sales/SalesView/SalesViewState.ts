import { ISale } from "domain/core/entities/saleEntity";
import ISaleFailure from "domain/core/failures/sale/saleFailure";

export interface ISalesViewState {
    sale: IGetSalesByIdState;
    approvedSale: IApprovedSaleState;
    rejectedSale: IRejectedSaleState;
}

interface IGetSalesByIdState {
    data: ISale;
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
}

interface IApprovedSaleState {
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
}

interface IRejectedSaleState {
    loading: boolean;
    sucessful: boolean;
    error: ISaleFailure | null;
}

export const initialState = {
    sale: {
        data: {} as ISale,
        loading: false,
        sucessful: false,
        error: null,
    },
    approvedSale: {
        loading: false,
        sucessful: false,
        error: null,
    },
    rejectedSale: {
        loading: false,
        sucessful: false,
        error: null,
    },
};
