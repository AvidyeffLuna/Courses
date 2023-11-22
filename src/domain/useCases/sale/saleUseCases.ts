import { ISale } from "domain/core/entities/saleEntity";
import { IApprovedSaleResponse, ICreateSalesResponse, IGetSaleByIdResponse, IGetSalesResponse, IRejectedSaleResponse } from "domain/core/response/sale/saleResponsesEntities";
import SaleRealmDatasource from "infrastructure/datasources/sale/realm/saleRealmDatasource";

export default class SaleUseCases {
  private _repository: SaleRealmDatasource = new SaleRealmDatasource();

  async getSales(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; minAmount?: number | null; maxAmount?: number | null; status?: string | null }): Promise<IGetSalesResponse> {
    try {
      const response = await this._repository.getSales({ sort: obj.sort, limit: obj.limit, skip: obj.skip, searchQuery: obj.searchQuery, minAmount: obj.minAmount, maxAmount: obj.maxAmount, status: obj.status });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSalesCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getSalesCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSaleById(obj: { saleId: string }): Promise<IGetSaleByIdResponse> {
    try {
      const response = await this._repository.getSaleById({ saleId: obj.saleId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createSale(obj: { sale: ISale }): Promise<ICreateSalesResponse> {
    try {
      const response = await this._repository.createSale({ sale: obj.sale });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async approvedSale(obj: { saleId: string; comment: string }): Promise<IApprovedSaleResponse> {
    try {
      const response = await this._repository.approvedSale({ saleId: obj.saleId, comment: obj.comment });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async rejectedSale(obj: { saleId: string; comment: string }): Promise<IRejectedSaleResponse> {
    try {
      const response = await this._repository.rejectedSale({ saleId: obj.saleId, comment: obj.comment });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
