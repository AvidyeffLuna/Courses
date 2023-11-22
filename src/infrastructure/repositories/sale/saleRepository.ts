import { ISale } from "domain/core/entities/saleEntity";
import ISaleFailure from "domain/core/failures/sale/saleFailure";
import { IApprovedSaleResponse, ICreateSalesResponse, IGetSaleByIdResponse, IGetSalesResponse, IRejectedSaleResponse } from "domain/core/response/sale/saleResponsesEntities";

export default interface ISaleRepository {
  getSales(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; minAmount?: number | null; maxAmount?: number | null; status?: string | null }): Promise<IGetSalesResponse | ISaleFailure>;
  getSalesCount(obj: { query?: Object | null; }): Promise<number | ISaleFailure>;
  getSaleById(obj: { saleId: string }): Promise<IGetSaleByIdResponse | ISaleFailure>;
  createSale(obj: { sale: ISale }): Promise<ICreateSalesResponse | ISaleFailure>;
  approvedSale(obj: { saleId: string; comment: string }): Promise<IApprovedSaleResponse | ISaleFailure>;
  rejectedSale(obj: { saleId: string; comment: string }): Promise<IRejectedSaleResponse | ISaleFailure>;
}
