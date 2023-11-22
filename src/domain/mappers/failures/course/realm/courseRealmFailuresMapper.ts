import ICourseFailure from "domain/core/failures/course/courseFailure";
import { createCourseFailures, createCourseItemsFailures, createCourseLessonsFailures, createCourseTasksFailures, createCourseUsersFailures, disabledCourseFailures, editFinishTasksFailures, getCourseFailures, getCoursesFailures, getCoursesItemsFailures, getCoursesLessonsFailures, getCoursesTasksFailures, getCoursesUsersFailures } from "../courseFailures";

export function fromGetCoursesFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getCoursesFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetCourseFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getCourseFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateCourseFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            case "create-course/slug-in-use":
                failure.code = createCourseFailures["SLUG_IN_USE"];
                break;

            default:
                failure.code = createCourseFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}


export function fromEditDisabledCourseFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = disabledCourseFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetCourseLessonsFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getCoursesLessonsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateCourseLessonFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = createCourseLessonsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}


export function fromGetCourseItemsFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getCoursesItemsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateCourseItemFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = createCourseItemsFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetCourseTasksFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getCoursesTasksFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateCourseTaskFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = createCourseTasksFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromEditFinishCourseTaskFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = editFinishTasksFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromGetCourseUsersFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message,
    };

    if (message) {
        switch (message) {
            default:
            failure.code = getCoursesUsersFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

export function fromCreateCourseUserFailureRealmMapper(message: string): ICourseFailure {
    const failure: ICourseFailure = {
        code: 0,
        message: message, 
    };

    if (message) {
        switch (message) {
            default:
                failure.code = createCourseUsersFailures["SERVER_ERROR"];
        }
    }
  
    return failure;
}

