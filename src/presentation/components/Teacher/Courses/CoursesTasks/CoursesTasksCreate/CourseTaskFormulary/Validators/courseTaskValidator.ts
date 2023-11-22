import { IFieldValidator } from "presentation/validators/vallidator";

const onTitleValidated = (title: string): IFieldValidator => {
    if (title.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el titulo de la tarea" } }
    }

    return { isValid: true, error: null };
}

const onDescriptionValidated = (description: string): IFieldValidator => {
    if (description.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir una descripción de la tarea" } }
    }

    return { isValid: true, error: null };
}


type TCourseTaskValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const courseTaskValidators: TCourseTaskValidators = {
    title: onTitleValidated,
    description: onDescriptionValidated,
}