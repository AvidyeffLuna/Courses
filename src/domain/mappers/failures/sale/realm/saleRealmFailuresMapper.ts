import ISaleFailure from "domain/core/failures/sale/saleFailure";
import { createSaleFailures, getSaleFailures, getSalesFailures } from "../saleFailures";
import { approvedSaleFailures, rejectedSaleFailures } from "../saleFailures";

export function fromGetSalesFailureRealmMapper(message: string): ISaleFailure {
    const failure: ISaleFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getSalesFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetSaleFailureRealmMapper(message: string): ISaleFailure {
    const failure: ISaleFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getSaleFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateSaleFailureRealmMapper(message: string): ISaleFailure {
    const failure: ISaleFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = createSaleFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromApprovedSaleFailureRealmMapper(message: string): ISaleFailure {
    const failure: ISaleFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = approvedSaleFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromRejectedSaleFailureRealmMapper(message: string): ISaleFailure {
    const failure: ISaleFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = rejectedSaleFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}
