import { ITransaction } from "domain/core/entities/transactionEntity";
import { IResponseMetadata } from "../responseEntity";

export interface IGetTransactionsResponse {
    data: ITransaction[];
    metadata: IResponseMetadata;
}

export interface IGetTransactionByIdResponse {
    data: ITransaction;
    metadata: IResponseMetadata;
}

export interface ICreateTransactionsResponse {
    data: ITransaction;
    metadata: IResponseMetadata;
}

export interface IApprovedTransactionResponse {
    data: null;
    metadata: IResponseMetadata;
}

export interface IRejectedTransactionResponse {
    data: null;
    metadata: IResponseMetadata;
}
