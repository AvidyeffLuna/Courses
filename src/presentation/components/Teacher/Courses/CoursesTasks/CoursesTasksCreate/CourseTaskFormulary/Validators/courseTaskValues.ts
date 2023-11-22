import {  IFieldValue } from "presentation/validators/fieldValues";

export type TCourseTaskValues = {
  [key: string]: string;
}

export const courseTaskInitialValues: TCourseTaskValues = {
  title: "",
  description: "",
}

export const courseTaskFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "title",
      type: "text",
      placeholder: "Titulo de la tarea",
      label: "Escribe el titulo de la tarea",
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
      placeholder: "Sobre la tarea",
      label: "Explica todo sobre la tarea",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
   
  ]
