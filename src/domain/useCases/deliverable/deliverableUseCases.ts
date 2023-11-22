import { IDeliverable } from "domain/core/entities/deliverableEntity";
import DeliverableRealmDatasource from "infrastructure/datasources/deliverable/realm/deliverableRealmDatasource";

export default class DeliverableUseCases {
  private _repository: DeliverableRealmDatasource = new DeliverableRealmDatasource();

  async getDeliverables(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<IDeliverable[]> {
    try {
      const response = await this._repository.getDeliverables({ query: obj.query, sort: obj.sort, limit: obj.limit });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDeliverableById(obj: { deliverableId: string }): Promise<IDeliverable> {
    try {
      const response = await this._repository.getDeliverableById({ deliverableId: obj.deliverableId });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDeliverablesCount(obj: { query?: Object | null; }): Promise<number> {
    try {
      const response = await this._repository.getDeliverablesCount({ query: obj.query });

      if (typeof response !== "number") throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createDeliverable(obj: { deliverable: IDeliverable }): Promise<IDeliverable> {
    try {
      const response = await this._repository.createDeliverable({ deliverable: obj.deliverable });

      if ("code" in response) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
