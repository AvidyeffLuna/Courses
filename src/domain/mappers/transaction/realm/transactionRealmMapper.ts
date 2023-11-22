import { ITransaction } from "domain/core/entities/transactionEntity";

export function transactionRealmDataToEntity(data: any): ITransaction {
  return {
    transactionId: data?._id ? data?._id.toString() : "",
    userId: data?.userId ?? "",
    saleId: data?.saleId ?? "",
    amount: data?.amount ?? 0,
    amountBs: data?.amountBs ?? 0,
    status: data?.status ?? "",
    createdAt: data?.createdAt ?? new Date(),
    approvedAt: data?.approvedAt ?? null,
    rejectedAt: data?.rejectedAt ?? null
  } as ITransaction;
}

export function transactionFromRealmToDocumentData(transaction: ITransaction): any {
  const documentData = {
    _id: transaction.transactionId,
    userId: transaction.userId,
    saleId: transaction.saleId,
    amount: transaction.amount,
    amountBs: transaction.amountBs,
    status: transaction.status,
    createdAt: transaction.createdAt,
    approvedAt: transaction.approvedAt,
    rejectedAt: transaction.rejectedAt,
  };

  return documentData;
}
