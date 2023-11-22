import { onNumberValidated } from "presentation/validators/fieldValidated";
import { IFieldValidator } from "presentation/validators/vallidator";

const onScoreValidated = (score: string): IFieldValidator => {
    if (score.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir el titulo de la respuesta" } }
    }

    if (onNumberValidated(score)) {
        return { isValid: false, error: { code: "field-invalid-format", message: "Solo carácteres númericos" } }
    }

    if (parseInt(score) > 10) {
        return { isValid: false, error: { code: "field-invalid-format", message: "El puntaje no debe ser mayor a 10 puntos" } }
    }

    return { isValid: true, error: null };
}

const onNoteValidated = (note: string): IFieldValidator => {
    if (note.length === 0) {
        return { isValid: false, error: { code: "field-is-required", message: "Debe escribir una evaluación al estudiante" } }
    }

    return { isValid: true, error: null };
}

type TDeliverableTaskFinishValidators = {
    [key: string]: (value: string) => IFieldValidator;
}

export const deliverableTaskFinishValidators: TDeliverableTaskFinishValidators = {
    score: onScoreValidated,
    note: onNoteValidated,
}