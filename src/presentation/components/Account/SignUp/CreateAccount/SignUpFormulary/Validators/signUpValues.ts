import { IFieldValue } from "presentation/validators/fieldValues";

export type TSignUpValues = {
  [key: string]: string;
}

export const signUpInitialValues: TSignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

export const signUpFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "firstName",
      type: "text",
      placeholder: "Escribe tu nombre",
      label: "Escribe tu nombre",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 1,
      name: "lastName",
      type: "text",
      placeholder: "Escribe tu apellido",
      label: "Escribe tu apellido",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 2,
      name: "email",
      type: "text",
      placeholder: "Escribe tu correo electrónico",
      label: "Escribe tu correo electrónico",
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
      placeholder: "Crea una contraseña",
      label: "Crea una contraseña",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
  ]
