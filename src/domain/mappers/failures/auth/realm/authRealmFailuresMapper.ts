import IAuthFailure from 'domain/core/failures/auth/authFailure';
import { changePasswordFailures, getUserAuthenticatedFailures, sendCodeSecurityFailures, setCodeSecurityFailures, signInFailures, signUpFailures, updateUserEmailVerifiedFailures } from '../authFailures';

export function fromSignInUserFailureRealmMapper(message: string): IAuthFailure {
    const failure: IAuthFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
        case "invalid username/password":
            failure.code = signInFailures["USER_NOT_FOUND"];
            break;
        case "invalid username/password":
            failure.code = signInFailures["WRONG_PASSWORD"];
            break;
        case "invalid too-many-requests":
            failure.code = signInFailures["TOO_MANY_REQUEST"];
            break;
        
        default:
            failure.code = signInFailures["SERVER_ERROR"];
        }
    }

    return failure;
}

export function fromGetUserAuthenticatedFailureRealmMapper(message: string): IAuthFailure {
    const failure: IAuthFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
        case "invalid user-not-found":
            failure.code = getUserAuthenticatedFailures["USER_NOT_FOUND"];
            break;
        
        default:
            failure.code = getUserAuthenticatedFailures["SERVER_ERROR"];
        }
    }

    return failure;
}

export function fromSignUpUserFailureRealmMapper(message: string): IAuthFailure {
    const failure: IAuthFailure = {
        code: 0,
        message: message,
    };
    
    if (message) {
        switch (message) {
            case "name already in use":
            failure.code = signUpFailures["EMAIL_IS_REGISTERED"];
            break;

            default:
            failure.code = signUpFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromChangePasswordFailureRealmMapper(message: string): IAuthFailure {
    const failure: IAuthFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            case "invalid username/password":
            failure.code = changePasswordFailures["WRONG_PASSWORD"];
            break;

            default:
            failure.code = changePasswordFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromSetCodeSecurityFailureRealmMapper(message: string): IAuthFailure {
    const failure: IAuthFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = setCodeSecurityFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromSendCodeSecurityFailureRealmMapper(message: string): IAuthFailure {
    const failure: IAuthFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            case "code expired":
            failure.code = sendCodeSecurityFailures["CODE_SECURITY_EXPIRED"];
            break;

            default:
            failure.code = sendCodeSecurityFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromUpdateUserEmailVerifiedFailureRealmMapper(message: string): IAuthFailure {
    const failure: IAuthFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = updateUserEmailVerifiedFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}
