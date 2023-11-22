import { ISale } from "domain/core/entities/saleEntity";
import { IResponseMetadata } from "../responseEntity";

export interface IGetSalesResponse {
    data: ISale[];
    metadata: IResponseMetadata;
}

export interface IGetSaleByIdResponse {
    data: ISale;
    metadata: IResponseMetadata;
}

export interface ICreateSalesResponse {
    data: ISale;
    metadata: IResponseMetadata;
}

export interface IApprovedSaleResponse {
    data: null;
    metadata: IResponseMetadata;
}

export interface IRejectedSaleResponse {
    data: null;
    metadata: IResponseMetadata;
}
