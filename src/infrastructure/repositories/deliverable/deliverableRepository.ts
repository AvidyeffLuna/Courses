import { IDeliverable } from "domain/core/entities/deliverableEntity";
import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";

export default interface IDeliverableRepository {
  getDeliverables(obj: { query?: Object | null; sort?: Object | null; limit?: number | null; skip?: number | null }): Promise<IDeliverable[] | IDeliverableFailure>;
  getDeliverableById(obj: { deliverableId: string }): Promise<IDeliverable | IDeliverableFailure>;
  getDeliverablesCount(obj: { query?: Object | null; }): Promise<number | IDeliverableFailure>;
  createDeliverable(obj: { deliverable: IDeliverable }): Promise<IDeliverable | IDeliverableFailure>;
}
