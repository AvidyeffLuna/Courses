import { IFieldValue } from "presentation/validators/fieldValues";

export type TMobileValues = {
  [key: string]: string;
}

export const mobileInitialValues: TMobileValues = {
  documentType: "V",
  documentNumber: "",
  phoneOperatorCode: "412",
  phoneNumber: "",
  reference: "",
}

export const mobileFields: IFieldValue[] = [
  {
    fieldId: 0,
    name: "documentType",
    type: "select",
    placeholder: "",
    label: "Selecciona tu tipo de documento",
    options: [
      {
        value: "V",
        text: "Venezolano",
      },
      {
        value: "P",
        text: "Pasaporte",
      },
      {
        value: "RIF",
        text: "RIF",
      },
    ],
    row: {
      lg: 4,
      md: 4,
      sm: 4,
      xs: 12
    },
  },
  {
    fieldId: 1,
    name: "documentNumber",
    type: "text",
    placeholder: "Identificación del documento",
    label: "Escribe la identificación del documento",
    row: {
      lg: 8,
      md: 8,
      sm: 8,
      xs: 12
    },
  },
  {
    fieldId: 2,
    name: "phoneOperatorCode",
    type: "select",
    options: [
      {
        value: "412",
        text: "412",
      },
      {
        value: "414",
        text: "426",
      },
      {
        value: "416",
        text: "416",
      },
      {
        value: "424",
        text: "424",
      },
    ],
    placeholder: "",
    label: "Operadora",
    row: {
      lg: 2,
      md: 2,
      sm: 2,
      xs: 12
    },
  },
  {
    fieldId: 3,
    name: "phoneNumber",
    type: "text",
    placeholder: "Número de teléfono",
    label: "Escribe el número de teléfono",
    row: {
      lg: 10,
      md: 10,
      sm: 10,
      xs: 12
    },
  },
  {
    fieldId: 4,
    name: "reference",
    type: "text",
    placeholder: "Referencia",
    label: "Escribe la referencia",
    row: {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 12
    },
  },
]
