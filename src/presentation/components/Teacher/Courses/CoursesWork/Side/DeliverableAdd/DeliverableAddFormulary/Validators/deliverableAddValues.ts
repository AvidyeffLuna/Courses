import { IFieldValue } from "presentation/validators/fieldValues";

export type TDeliverableAddValues = {
  [key: string]: string;
}

export const deliverableAddInitialValues: TDeliverableAddValues = {
  title: "",
  description: "",
}

export const deliverableAddFields: IFieldValue[] = [
  {
    fieldId: 0,
    name: "title",
    type: "text",
    placeholder: "Titulo de la respuesta",
    label: "Escribe el titulo de la respuesta",
    row: {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 12
    },
  },
  {
    fieldId: 1,
    name: "description",
    type: "textarea",
    placeholder: "Descripción de la respuesta",
    label: "Describe sobre la respuesta al creador",
    row: {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 12
    },
  },
]
