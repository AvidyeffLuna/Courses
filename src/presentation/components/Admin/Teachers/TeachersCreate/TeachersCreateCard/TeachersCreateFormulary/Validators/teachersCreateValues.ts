import { monthsList } from "presentation/utils/dates/monthsUtils";
import { getYearsList } from "presentation/utils/years/yearsUtils";
import { IFieldOption, IFieldValue } from "presentation/validators/fieldValues";

export type TTeachersCreateValues = {
  [key: string]: string;
}

export const teachersCreateInitialValues: TTeachersCreateValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

export const teachersCreateFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "firstName",
      type: "text",
      placeholder: "Nombre",
      label: "Escribe el nombre",
      row: {
        lg: 6,
        md: 6,
        sm: 12,
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
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 2,
      name: "email",
      type: "text",
      placeholder: "Correo electronico",
      label: "Escribe el correo electrónico",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 3,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      label: "Crea una contraseña",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
  ]
