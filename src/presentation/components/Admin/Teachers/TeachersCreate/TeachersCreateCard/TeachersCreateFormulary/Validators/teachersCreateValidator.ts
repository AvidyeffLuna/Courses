import { IFieldValidator } from "presentation/validators/vallidator";

const onFirstNameValidated = (firstName: string): IFieldValidator => {
    if (firstName.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el nombre" } }
    }

    return { isValid: true, error: null };
}

const onLastNameValidated = (lastName: string): IFieldValidator => {
    if (lastName.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el apellido" } }
    }

    return { isValid: true, error: null };
}

const onEmailValidated = (email: string): IFieldValidator => {
    if (email.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su correo electrónico" } }
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "Debe escribir un correo electrónico valido" } }
    }

    return { isValid: true, error: null };
}

const onPasswordValidated = (password: string): IFieldValidator => {
    if (password.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe crear una contraseña" } }
    }

    if (password.length < 6 || password.length > 18) {
        return { isValid: false, error: { code: "field-length", message: "La contraseña debe tener de 6 a 18 carácteres" } }
    }

    return { isValid: true, error: null };
}

type TTeachersCreateValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const teachersCreateValidators: TTeachersCreateValidators = {
    firstName: onFirstNameValidated,
    lastName: onLastNameValidated,
    email: onEmailValidated,
    password: onPasswordValidated
}