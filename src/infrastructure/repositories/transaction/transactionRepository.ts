import { ITransaction } from "domain/core/entities/transactionEntity";
import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";
import { IApprovedTransactionResponse, ICreateTransactionsResponse, IGetTransactionByIdResponse, IGetTransactionsResponse, IRejectedTransactionResponse } from "domain/core/response/transaction/transactionResponsesEntities";

export default interface ITransactionRepository {
  getTransactions(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; userId?: string | null }): Promise<IGetTransactionsResponse | ITransactionFailure>;
  getTransactionsCount(obj: { query?: Object | null; }): Promise<number | ITransactionFailure>;
  getTransactionById(obj: { transactionId: string }): Promise<IGetTransactionByIdResponse | ITransactionFailure>;
  createTransaction(obj: { transaction: ITransaction }): Promise<ICreateTransactionsResponse | ITransactionFailure>;
  approvedTransaction(obj: { transactionId: string }): Promise<IApprovedTransactionResponse | ITransactionFailure>;
  rejectedTransaction(obj: { transactionId: string }): Promise<IRejectedTransactionResponse | ITransactionFailure>;
}
