import { IFieldValue } from "presentation/validators/fieldValues";

export type TBankTransferValues = {
  [key: string]: string;
}

export const bankTransferInitialValues: TBankTransferValues = {
  documentType: "V",
  documentNumber: "",
  reference: "",
}

export const bankTransferFields: IFieldValue[] = [
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
