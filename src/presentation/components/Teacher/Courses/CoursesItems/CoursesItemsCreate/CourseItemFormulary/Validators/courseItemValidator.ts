import { IFieldValidator } from "presentation/validators/vallidator";

const onTitleValidated = (title: string): IFieldValidator => {
    if (title.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el titulo de la clase" } }
    }

    return { isValid: true, error: null };
}

const onDescriptionValidated = (description: string): IFieldValidator => {
    if (description.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir una descripción de la clase" } }
    }

    return { isValid: true, error: null };
}

const onTypeValidated = (type: string): IFieldValidator => {
    if (type.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe seleccionar el tipo de clase" } }
    }

    return { isValid: true, error: null };
}


type TCourseItemValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const courseItemValidators: TCourseItemValidators = {
    title: onTitleValidated,
    description: onDescriptionValidated,
    type: onTypeValidated
}