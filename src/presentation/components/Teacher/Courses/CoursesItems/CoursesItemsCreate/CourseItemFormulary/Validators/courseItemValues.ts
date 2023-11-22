import {  IFieldValue } from "presentation/validators/fieldValues";

export type TCourseItemValues = {
  [key: string]: string;
}

export const courseItemInitialValues: TCourseItemValues = {
  title: "",
  description: "",
}

export const courseItemFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "title",
      type: "text",
      placeholder: "Titulo de la clase",
      label: "Escribe el titulo de la clase",
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
      placeholder: "Sobre la clase",
      label: "Explica todo sobre la clase",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
   
  ]
