export const signInFailures = {
    "WRONG_PASSWORD": 401,
    "TOO_MANY_REQUEST": 402,
    "USER_NOT_FOUND": 404,
    "SERVER_ERROR": 500,
}

export const signUpFailures = {
    "EMAIL_IS_REGISTERED": 400,
    "SERVER_ERROR": 500,
}

export const getUserAuthenticatedFailures = {
    "USER_NOT_FOUND": 404,
    "SERVER_ERROR": 500,
}

export const changePasswordFailures = {
    "WRONG_PASSWORD": 401,
    "SERVER_ERROR": 500,
}

export const setCodeSecurityFailures = {
    "SERVER_ERROR": 500,
}

export const sendCodeSecurityFailures = {
    "CODE_SECURITY_EXPIRED": 400,
    "SERVER_ERROR": 500,
}

export const updateUserEmailVerifiedFailures = {
    "SERVER_ERROR": 500,
}
