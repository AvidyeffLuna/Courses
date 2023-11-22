import ITeacherFailure from "domain/core/failures/teacher/teacherFailure";
import { createTeacherFailures, getTeacherFailures, getTeachersFailures } from "../teacherFailures";

export function fromGetTeachersFailureRealmMapper(message: string): ITeacherFailure {
    const failure: ITeacherFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getTeachersFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetTeacherFailureRealmMapper(message: string): ITeacherFailure {
    const failure: ITeacherFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getTeacherFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateTeacherFailureRealmMapper(message: string): ITeacherFailure {
    const failure: ITeacherFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            case "name already in use":
            failure.code = createTeacherFailures["EMAIL_IS_REGISTERED"];
            break;

            default:
            failure.code = createTeacherFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}
