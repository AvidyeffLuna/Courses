import { IFieldValidator } from "presentation/validators/vallidator";

const onTitleValidated = (title: string): IFieldValidator => {
    if (title.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el titulo de la sección" } }
    }

    return { isValid: true, error: null };
}

const onDescriptionValidated = (description: string): IFieldValidator => {
    if (description.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir que aprenderá el estudiante en la sección" } }
    }

    return { isValid: true, error: null };
}


type TCourseLessonValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const courseLessonValidators: TCourseLessonValidators = {
    title: onTitleValidated,
    description: onDescriptionValidated,
}