import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";
import { createTransactionFailures, getTransactionFailures, getTransactionsFailures } from "../transactionFailures";
import { approvedTransactionFailures, rejectedTransactionFailures } from "../transactionFailures";

export function fromGetTransactionsFailureRealmMapper(message: string): ITransactionFailure {
    const failure: ITransactionFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getTransactionsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetTransactionFailureRealmMapper(message: string): ITransactionFailure {
    const failure: ITransactionFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getTransactionFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateTransactionFailureRealmMapper(message: string): ITransactionFailure {
    const failure: ITransactionFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = createTransactionFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}


export function fromApprovedTransactionFailureRealmMapper(message: string): ITransactionFailure {
    const failure: ITransactionFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = approvedTransactionFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromRejectedTransactionFailureRealmMapper(message: string): ITransactionFailure {
    const failure: ITransactionFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = rejectedTransactionFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}
