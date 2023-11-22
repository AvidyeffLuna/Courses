import ISaleFailure from "domain/core/failures/sale/saleFailure";
import { IGetSalesResponse } from "domain/core/response/sale/saleResponsesEntities";
import SalesUseCases from "domain/useCases/sale/saleUseCases";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import { Dispatch } from "react";

export interface ISalesListActions {
  getSales: Function;
}

const getSales = (obj: {
    minAmount?: number | null;
    maxAmount?: number | null;
    status?: string | null;
    page?: number | null;
    searchQuery?: string | null;
    limit?: number | null;
}) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "GET_SALES_LOADING" });

    let sort = {
      createdAt: -1
    };

    const skip: number | null = obj.page && obj.limit ? getSkipPagination({ page: obj.page, limit: obj.limit }) : null;

    await new SalesUseCases()
      .getSales({ sort, skip, limit: obj.limit, minAmount: obj.minAmount, maxAmount: obj.maxAmount, searchQuery: obj.searchQuery, status: obj.status })
      .then((res: IGetSalesResponse) => {
        dispatch({
          type: "GET_SALES_SUCESSFUL",
          payload: { data: res.data, total: res.metadata.total, sucessful: true },
        });
      })
      .catch((error: ISaleFailure) => {
        dispatch({ type: "GET_SALES_ERROR", payload: { error: error } });
      });
};
  

export const actions = {
    getSales,
};
