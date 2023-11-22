import { onNumberDecimalsValidated, onNumberValidated } from "presentation/validators/fieldValidated";
import { IFieldValidator } from "presentation/validators/vallidator";

const onDocumentTypeValidated = (documentType: string): IFieldValidator => {
    if (documentType.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe seleccionar el tipo de documento" } }
    }

    return { isValid: true, error: null };
}

const onDocumentNumberValidated = (documentNumber: string): IFieldValidator => {
    if (documentNumber.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el número de documento" } }
    }

    if (onNumberValidated(documentNumber)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "La identificación del documento debe contener solo carácteres númericos" } }
    }

    return { isValid: true, error: null };
}

const onReferenceValidated = (reference: string): IFieldValidator => {
    if (reference.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir la referencia del pago" } }
    }

    return { isValid: true, error: null };
}

type TBankTransferValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const bankTransferValidators: TBankTransferValidators = {
    documentType: onDocumentTypeValidated,
    documentNumber: onDocumentNumberValidated,
    reference: onReferenceValidated
}