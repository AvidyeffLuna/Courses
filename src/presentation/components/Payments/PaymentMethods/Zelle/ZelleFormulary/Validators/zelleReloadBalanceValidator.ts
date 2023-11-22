import { onNumberDecimalsValidated, onNumberValidated } from "presentation/validators/fieldValidated";
import { IFieldValidator } from "presentation/validators/vallidator";

const onFirstNameValidated = (firstName: string): IFieldValidator => {
    if (firstName.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su nombre" } }
    }

    return { isValid: true, error: null };
}

const onLastNameValidated = (lastName: string): IFieldValidator => {
    if (lastName.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir su apellido" } }
    }

    return { isValid: true, error: null };
}

const onAmountValidated = (amount: string): IFieldValidator => {
    if (amount.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el monto a recargar" } }
    }

    if (onNumberDecimalsValidated(amount)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "El monto a recargar debe contener solo valores númericos" } }
    }

    return { isValid: true, error: null };
}

const onReferenceValidated = (reference: string): IFieldValidator => {
    if (reference.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir la referencia" } }
    }

    return { isValid: true, error: null };
}

type TZelleReloadBalanceValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const zelleReloadBalanceValidators: TZelleReloadBalanceValidators = {
    firstName: onFirstNameValidated,
    lastName: onLastNameValidated,
    amount: onAmountValidated,
    reference: onReferenceValidated
}