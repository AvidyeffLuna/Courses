import { IFieldValue } from "presentation/validators/fieldValues";

export type TDeliverableTaskFinishValues = {
  [key: string]: string;
}

export const deliverableTaskFinishInitialValues: TDeliverableTaskFinishValues = {
  score: "",
  note: "",
}

export const deliverableTaskFinishFields: IFieldValue[] = [
  {
    fieldId: 0,
    name: "score",
    type: "text",
    placeholder: "Puntaje 1-10",
    label: "Escribe el puntaje de la tarea",
    row: {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 12
    },
  },
  {
    fieldId: 1,
    name: "note",
    type: "textarea",
    placeholder: "Evaluación",
    label: "Escribe una evaluación al estudiante",
    row: {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 12
    },
  },
]
