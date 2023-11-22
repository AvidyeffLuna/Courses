import { ISale } from "domain/core/entities/saleEntity";
import ISaleFailure from "domain/core/failures/sale/saleFailure";
import { fromApprovedSaleFailureRealmMapper, fromCreateSaleFailureRealmMapper, fromGetSaleFailureRealmMapper, fromGetSalesFailureRealmMapper, fromRejectedSaleFailureRealmMapper } from "domain/mappers/failures/sale/realm/saleRealmFailuresMapper";
import { saleFromRealmToDocumentData, saleRealmDataToEntity } from "domain/mappers/sale/realm/saleRealmMapper";
import { CLUSTER_NAME, DATABASE_NAME, getCurrentUser } from "infrastructure/config/mongo-realm/app";
import ISaleRepository from "infrastructure/repositories/sale/saleRepository";
import { userRealmDataToEntity } from "domain/mappers/user/realm/userRealmMapper";
import { IUser } from "domain/core/entities/userEntity";
import { IApprovedSaleResponse, ICreateSalesResponse, IGetSaleByIdResponse, IGetSalesResponse, IRejectedSaleResponse } from "domain/core/response/sale/saleResponsesEntities";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "infrastructure/config/firebase/firebase-client";

export default class SaleRealmDatasource implements ISaleRepository {
  async getSales(obj: { sort?: Object | null; limit?: number | null; skip?: number | null; searchQuery?: string | null; minAmount?: number | null; maxAmount?: number | null; status?: string | null }): Promise<IGetSalesResponse | ISaleFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Sales");

      const sales: ISale[] = [];

      let query = {};

      if (obj.minAmount || obj.maxAmount) query = { ...query, amount: { $gte: obj.minAmount, $lte: obj.maxAmount  } };

      if (obj.status) query = { ...query, status: obj.status };

      if (obj.searchQuery) query = { ...query, amount: parseFloat(obj.searchQuery) };

      console.log(query)

      const salesData = await collection.aggregate([
        { $match: query ?? {} },
        { $sort: obj.sort ?? { _id: 1 } },
        { $skip: obj.skip ?? 0 },
        { $limit: obj.limit ?? 999 },
      ]);

      if (salesData.length > 0) {
        await Promise.all(salesData.map(async (saleData: any) => {
          const saleMap: ISale = saleRealmDataToEntity(saleData);

          if (saleMap.userId.length > 0) {
            const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: saleMap.userId });
            const userJSON =  JSON.parse(JSON.stringify(userData));

            const userMap: IUser = userRealmDataToEntity(userJSON);

            if (userMap.userId.length > 0) saleMap.user = userMap;
          }

          if (saleMap.saleId.length > 0) sales.push(saleMap);
        }));
      }

      const salesTotal = await collection.count(query as Realm.Services.MongoDB.Filter);

      const response: IGetSalesResponse = {
        data: JSON.parse(JSON.stringify(sales)),
        metadata: JSON.parse(JSON.stringify({
          total: salesTotal,
          limit: obj.limit ?? 999,
        })), 
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetSalesFailureRealmMapper(exception.error);
    }
  }

  async getSalesCount(obj: { query?: Object | null; }): Promise<number | ISaleFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Sales");

      const salesCount = await collection.count(obj.query as Realm.Services.MongoDB.Filter);

      return salesCount;
    } catch (error) {
      const exception = error as any; 
      return fromGetSalesFailureRealmMapper(exception.error);
    }
  }

  async getSaleById(obj: { saleId: string }): Promise<IGetSaleByIdResponse | ISaleFailure> {
    try {
      const currentUser = await getCurrentUser();
      
      const mongo = currentUser.mongoClient(CLUSTER_NAME);

      const collection = mongo.db(DATABASE_NAME).collection("Sales");

      let sale: ISale = {} as ISale;

      const saleData = await collection.findOne({ _id: obj.saleId });

      if (saleData) {
        sale = saleRealmDataToEntity(saleData);
        
        if (sale.userId.length > 0) {
          const userData = await mongo.db(DATABASE_NAME).collection("Users").findOne({ _id: sale.userId });
          const userJSON = JSON.parse(JSON.stringify(userData));
  
          const userMap: IUser = userRealmDataToEntity(userJSON);
  
          if (userMap.userId.length > 0) sale.user = userMap;
        }
      }

      const response: IGetSaleByIdResponse = {
        data: JSON.parse(JSON.stringify(sale)),
        metadata: JSON.parse(JSON.stringify({})),
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromGetSaleFailureRealmMapper(exception.error);
    }
  }

  async createSale(obj: { sale: ISale }): Promise<ICreateSalesResponse | ISaleFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Sales");

      obj.sale.saleId = nanoid(20);
      obj.sale.userId = currentUser.id;

      if (obj.sale.mainPicture) {
        if (obj.sale.mainPicture.file) {
          const fileRef = ref(storage, `Sales/${obj.sale.saleId}/main-picture-${new Date().getTime()}-${nanoid(11)}`);

          await uploadBytes(fileRef, obj.sale.mainPicture.file);
        
          const pictureUrl = await getDownloadURL(fileRef);

          obj.sale.mainPictureUrl = pictureUrl;
        }
      }

      obj.sale.createdAt = new Date();

      await collection.insertOne(saleFromRealmToDocumentData(obj.sale));

      const response: ICreateSalesResponse = {
        data: obj.sale,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromCreateSaleFailureRealmMapper(exception.error);
    }
  }

  async approvedSale(obj: { saleId: string; comment: string }): Promise<IApprovedSaleResponse | ISaleFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Sales");

      await collection.updateOne(
        { _id: obj.saleId },
        { $set: { status: "approved", approvedAt: new Date() } }
      );

      await mongo.db(DATABASE_NAME).collection("Transactions").updateOne(
        { saleId: obj.saleId },
        { $set: { status: "approved", approvedAt: new Date() } }
      );

      const response: IApprovedSaleResponse = {
        data: null,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromApprovedSaleFailureRealmMapper(exception.error);
    }
  }

  async rejectedSale(obj: { saleId: string; comment: string }): Promise<IRejectedSaleResponse | ISaleFailure> {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Sales");
     
      await collection.updateOne(
        { _id: obj.saleId },
        { $set: { status: "rejected", rejectedAt: new Date() } }
      );

      await mongo.db(DATABASE_NAME).collection("Transactions").updateOne(
        { saleId: obj.saleId },
        { $set: { status: "rejected", rejectedAt: new Date() } }
      );

      const response: IRejectedSaleResponse = {
        data: null,
        metadata: {}
      }

      return response;
    } catch (error) {
      const exception = error as any; 
      return fromRejectedSaleFailureRealmMapper(exception.error);
    }
  }
}
