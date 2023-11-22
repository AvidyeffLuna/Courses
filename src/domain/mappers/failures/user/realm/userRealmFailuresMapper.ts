import IUserFailure from "domain/core/failures/user/userFailure";
import { createUserFailures, getUserFailures, getUsersFailures } from "../userFailures";

export function fromGetUsersFailureRealmMapper(message: string): IUserFailure {
    const failure: IUserFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getUsersFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetUserFailureRealmMapper(message: string): IUserFailure {
    const failure: IUserFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getUserFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateUserFailureRealmMapper(message: string): IUserFailure {
    const failure: IUserFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            case "name already in use":
            failure.code = createUserFailures["EMAIL_IS_REGISTERED"];
            break;

            default:
            failure.code = createUserFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}
