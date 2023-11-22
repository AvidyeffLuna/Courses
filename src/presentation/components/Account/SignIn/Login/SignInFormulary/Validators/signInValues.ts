import { IFieldValue } from "presentation/validators/fieldValues";

export type TSignInValues = {
  [key: string]: string;
}

export const signInInitialValues: TSignInValues = {
  email: "",
  password: "",
}

export const signInFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "email",
      type: "text",
      placeholder: "Correo electrónico",
      label: "Correo electrónico",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 1,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      label: "Contraseña",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
  ]
