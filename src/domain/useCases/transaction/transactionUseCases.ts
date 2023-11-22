import { ITransaction } from "domain/core/entities/transactionEntity";
import { IApprovedTransactionResponse, ICreateTransactionsResponse, IGetTransactionByIdResponse, IGetTransactionsResponse, IRejectedTransactionResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import TransactionRealmDatasource from "infrastructure/datasources/transaction/realm/transactionRealmDatasource";

export default class TransactionUseCases {
  private _repository: TransactionRealmDatasource = new TransactionRealmDatasource();

  async getTransactions(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; userId?: string | null }): Promise<IGetTransactionsResponse> {
    try {
      const response = await this._repository.getTransactions({ sort: obj.sort, limit: obj.limit, skip: obj.skip, userId: obj.userId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionsCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getTransactionsCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionById(obj: { transactionId: string }): Promise<IGetTransactionByIdResponse> {
    try {
      const response = await this._repository.getTransactionById({ transactionId: obj.transactionId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createTransaction(obj: { transaction: ITransaction }): Promise<ICreateTransactionsResponse> {
    try {
      const response = await this._repository.createTransaction({ transaction: obj.transaction });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async approvedTransaction(obj: { transactionId: string }): Promise<IApprovedTransactionResponse> {
    try {
      const response = await this._repository.approvedTransaction({ transactionId: obj.transactionId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async rejectedTransaction(obj: { transactionId: string }): Promise<IRejectedTransactionResponse> {
    try {
      const response = await this._repository.rejectedTransaction({ transactionId: obj.transactionId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
