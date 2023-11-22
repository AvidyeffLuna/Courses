import { IFieldValidator } from "presentation/validators/vallidator";

const onTitleValidated = (title: string): IFieldValidator => {
    if (title.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el titulo del entregable" } }
    }

    return { isValid: true, error: null };
}

const onDescriptionValidated = (description: string): IFieldValidator => {
    if (description.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir la descripción del entregable" } }
    }

    return { isValid: true, error: null };
}

type TDeliverableAddValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const deliverableAddValidators: TDeliverableAddValidators = {
    title: onTitleValidated,
    description: onDescriptionValidated,
}