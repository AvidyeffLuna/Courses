import { monthsList } from "presentation/utils/dates/monthsUtils";
import { getYearsList } from "presentation/utils/years/yearsUtils";
import { IFieldOption, IFieldValue } from "presentation/validators/fieldValues";

export type TZelleReloadBalanceValues = {
  [key: string]: string;
}

export const zelleReloadBalanceInitialValues: TZelleReloadBalanceValues = {
  firstName: "",
  lastName: "",
  reference: "",
  amount: ""
}

export const zelleReloadBalanceFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "firstName",
      type: "text",
      placeholder: "Nombre",
      label: "Escribe el nombre",
      row: {
        lg: 6,
        md: 6,
        sm: 6,
        xs: 12
      },
    },
    {
      fieldId: 1,
      name: "lastName",
      type: "text",
      placeholder: "Apellido",
      label: "Escribe el apellido",
      row: {
        lg: 6,
        md: 6,
        sm: 6,
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
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 3,
      name: "amount",
      type: "text",
      placeholder: "Monto (USD)",
      label: "Escribe el monto",
      row: {
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12
      },
    },
  ]
