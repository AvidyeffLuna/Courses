import {  IFieldValue } from "presentation/validators/fieldValues";

export type TCourseLessonValues = {
  [key: string]: string;
}

export const courseLessonInitialValues: TCourseLessonValues = {
  title: "",
  description: "",
}

export const courseLessonFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "title",
      type: "text",
      placeholder: "Titulo de la sección",
      label: "Escribe el titulo de la sección",
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
      placeholder: "Sobre la sección",
      label: "¿Qué aprenderá el estudiante en esta sección?",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
  ]
