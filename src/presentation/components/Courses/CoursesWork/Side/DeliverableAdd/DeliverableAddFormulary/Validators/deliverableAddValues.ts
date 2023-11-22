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
    placeholder: "Titulo del entregable",
    label: "Escribe el titulo del entregable",
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
    placeholder: "Descripción del entregable",
    label: "Describe todo respecto al entregable",
    row: {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 12
    },
  },
]
