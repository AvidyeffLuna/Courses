import IDeliverableFailure from "domain/core/failures/deliverable/deliverableFailure";
import { createDeliverableFailures, getDeliverableByIdFailures, getDeliverablesFailures } from "../deliverableFailure";

export function fromGetDeliverablesFailureRealmMapper(message: string): IDeliverableFailure {
    const failure: IDeliverableFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getDeliverablesFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetDeliverableByIdFailureRealmMapper(message: string): IDeliverableFailure {
    const failure: IDeliverableFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getDeliverableByIdFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateDeliverableFailureRealmMapper(message: string): IDeliverableFailure {
    const failure: IDeliverableFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = createDeliverableFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}
