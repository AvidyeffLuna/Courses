import { onNumberDecimalsValidated, onNumberValidated } from "presentation/validators/fieldValidated";
import { IFieldValidator } from "presentation/validators/vallidator";

const onCourseNameValidated = (courseName: string): IFieldValidator => {
    if (courseName.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el nombre del curso" } }
    }

    return { isValid: true, error: null };
}

const onInitCourseDayValidated = (initCourseDay: string): IFieldValidator => {
    if (initCourseDay.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "El día es obligatorio" } }
    }

    if (onNumberValidated(initCourseDay)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "Solo carácteres númericos" } }
    }

    if (parseInt(initCourseDay, 10) === 0 || parseInt(initCourseDay, 10) > 31) {
        return { isValid: false, error: { code: "field-invalid-format", message: "El día es invalido" } }
    }

    return { isValid: true, error: null };
}

const onInitCourseMonthValidated = (initCourseMonth: string): IFieldValidator => {
    if (initCourseMonth.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "El mes es obligatorio" } }
    }

    if (onNumberValidated(initCourseMonth)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "Solo carácteres númericos" } }
    }

    if (parseInt(initCourseMonth, 10) === 0 || parseInt(initCourseMonth, 10) > 12) {
        return { isValid: false, error: { code: "field-invalid-format", message: "El mes es invalido" } }
    }

    return { isValid: true, error: null };
}

const onInitCourseYearValidated = (initCourseYear: string): IFieldValidator => {
    if (initCourseYear.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "El año es obligatorio" } }
    }

    if (onNumberValidated(initCourseYear)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "Solo carácteres númericos" } }
    }

    if (parseInt(initCourseYear, 10) === 0) {
        return { isValid: false, error: { code: "field-invalid-format", message: "El año es invalido" } }
    }

    return { isValid: true, error: null };
}

const onDescriptionValidated = (description: string): IFieldValidator => {
    if (description.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir una descripción para el curso" } }
    }

    return { isValid: true, error: null };
}

const onPriceCourseValidated = (priceCourse: string): IFieldValidator => {
    if (priceCourse.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "El precio del curso es obligatorio" } }
    }

    if (onNumberDecimalsValidated(priceCourse)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "Solo carácteres númericos" } }
    }

    return { isValid: true, error: null };
}

type TAboutCourseValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const aboutCourseValidators: TAboutCourseValidators = {
    courseName: onCourseNameValidated,
    initCourseDay: onInitCourseDayValidated,
    initCourseMonth: onInitCourseMonthValidated,
    initCourseYear: onInitCourseYearValidated,
    description: onDescriptionValidated,
    coursePrice: onPriceCourseValidated,
}