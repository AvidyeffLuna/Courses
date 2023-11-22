import { ITransaction } from "domain/core/entities/transactionEntity";
import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";
import { fromApprovedTransactionFailureRealmMapper, fromCreateTransactionFailureRealmMapper, fromGetTransactionFailureRealmMapper, fromGetTransactionsFailureRealmMapper, fromRejectedTransactionFailureRealmMapper } from "domain/mappers/failures/transaction/realm/transactionRealmFailuresMapper";
import { transactionFromRealmToDocumentData, transactionRealmDataToEntity } from "domain/mappers/transaction/realm/transactionRealmMapper";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ITransactionRepository from "infrastructure/repositories/transaction/transactionRepository";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";
import { IUser } from "domain/core/entities/userEntity";
import { IApprovedTransactionResponse, ICreateTransactionsResponse, IGetTransactionByIdResponse, IGetTransactionsResponse, IRejectedTransactionResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import { saleRealmDataToEntity } from "domain/mappers/sale/realm/saleRealmMapper";
import { ISale } from "domain/core/entities/saleEntity";
import { nanoid } from "nanoid";

export default class TransactionRealmDatasource implements ITransactionRepository {
  async getTransactions(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; userId?: string | null }): Promise<IGetTransactionsResponse | ITransactionFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Transactions");

      const transactions: ITransaction[] = [];

      let query = {};

      if (obj.userId) query = { ...query, userId: obj.userId };

      const transactionsData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (transactionsData.length > 0) {
        await Promise.all(transactionsData.map(async (transactionData: any) => {
          const transactionMap: ITransaction = transactionRealmDataToEntity(transactionData);

          if (transactionMap.userId.length > 0) {
            const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: transactionMap.userId });
            const userJSON =  JSON.parse(JSON.stringify(userData));

            const userMap: IUser = userRealmDataToEntity(userJSON);

            if (userMap.userId.length > 0) transactionMap.user = userMap;
          }

          if (transactionMap.saleId && transactionMap.saleId.length > 0) {
            const saleData = await mongo.db(DATABASE_NAME).collection("Sales").findOne({ _id: transactionMap.saleId });
            const saleJSON =  JSON.parse(JSON.stringify(saleData));

            const saleMap: ISale = saleRealmDataToEntity(saleJSON);

            if (saleMap.saleId.length > 0) transactionMap.sale = saleMap;
          }

          if (transactionMap.transactionId.length > 0) transactions.push(transactionMap);
        }));
      }

      const transactionsTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetTransactionsResponse = {
        data: JSON.parse(JSON.stringify(transactions)),
        metadata: JSON.parse(JSON.stringify({
          total: transactionsTotal,
          limit: obj.limit ?? 999,
        })), 
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetTransactionsFailureRealmMapper(exception.error);
    }
  }

  async getTransactionsCount(obj: { query?: Object | null; }): Promise<number | ITransactionFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Transactions");

      const transactionsCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return transactionsCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetTransactionsFailureRealmMapper(exception.error);
    }
  }

  async getTransactionById(obj: { transactionId: string }): Promise<IGetTransactionByIdResponse | ITransactionFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("Transactions");

      let transaction: ITransaction = {} as ITransaction;

      const transactionData = await collection.findOne({ _id: obj.transactionId });

      if (transactionData) {
        transaction = transactionRealmDataToEntity(transactionData);
        
        if (transaction.userId.length > 0) {
          const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: transaction.userId });
          const userJSON = JSON.parse(JSON.stringify(userData));
  
          const userMap: IUser = userRealmDataToEntity(userJSON);
  
          if (userMap.userId.length > 0) transaction.user = userMap;
        }

        if (transaction.saleId && transaction.saleId.length > 0) {
          const saleData = await mongo.db(DATABASE_NAME).collection("Sales").findOne({ _id: transaction.saleId });
          const saleJSON =  JSON.parse(JSON.stringify(saleData));

          const saleMap: ISale = saleRealmDataToEntity(saleJSON);

          if (saleMap.saleId.length > 0) transaction.sale = saleMap;
        }
      }

      const response: IGetTransactionByIdResponse = {
        data: JSON.parse(JSON.stringify(transaction)),
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetTransactionFailureRealmMapper(exception.error);
    }
  }

  async createTransaction(obj: { transaction: ITransaction }): Promise<ICreateTransactionsResponse | ITransactionFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Transactions");

      obj.transaction.transactionId = nanoid(20);
      obj.transaction.userId = currentUser.id;
      obj.transaction.createdAt = new Date();

      await collection.insertOne(transactionFromRealmToDocumentData(obj.transaction));

      const response: ICreateTransactionsResponse = {
        data: obj.transaction,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateTransactionFailureRealmMapper(exception.error);
    }
  }

  async approvedTransaction(obj: { transactionId: string }): Promise<IApprovedTransactionResponse | ITransactionFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Transactions");

      await collection.updateOne(
        { _id: obj.transactionId },
        { $set: { status: "approved", approvedAt: new Date() } }
      );

      const response: IApprovedTransactionResponse = {
        data: null,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromApprovedTransactionFailureRealmMapper(exception.error);
    }
  }

  async rejectedTransaction(obj: { transactionId: string }): Promise<IRejectedTransactionResponse | ITransactionFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Transactions");
     
      await collection.updateOne(
        { _id: obj.transactionId },
        { $set: { status: "rejected", rejectedAt: new Date() } }
      );

      const response: IRejectedTransactionResponse = {
        data: null,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromRejectedTransactionFailureRealmMapper(exception.error);
    }
  }
}
