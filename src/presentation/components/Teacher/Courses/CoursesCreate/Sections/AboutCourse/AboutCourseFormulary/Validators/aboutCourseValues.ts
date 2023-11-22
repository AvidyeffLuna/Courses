import { monthsList } from "presentation/utils/dates/monthsUtils";
import { getYearsList } from "presentation/utils/years/yearsUtils";
import { IFieldOption, IFieldValue } from "presentation/validators/fieldValues";

export type TAboutCourseValues = {
  [key: string]: string;
}

export const aboutCourseInitialValues: TAboutCourseValues = {
  courseName: "",
  initCourseDay: "",
  initCourseMonth: "",
  initCourseYear: "",
  description: "",
  coursePrice: "",
}

export const aboutCourseFields: IFieldValue[] = [
    {
      fieldId: 0,
      name: "courseName",
      type: "text",
      placeholder: "Nombre del curso",
      label: "Escribe el nombre del curso",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 1,
      name: "initCourseDay",
      type: "text",
      placeholder: "Día",
      label: "Inicio del curso",
      row: {
        lg: 4,
        md: 2,
        sm: 2,
        xs: 4
      },
    },
    {
      fieldId: 2,
      name: "initCourseMonth",
      type: "select",
      placeholder: "Mes",
      label: "",
      options: monthsList as IFieldOption[],
      row: {
        lg: 4,
        md: 2,
        sm: 2,
        xs: 4
      },
    },
    {
      fieldId: 3,
      name: "initCourseYear",
      type: "select",
      placeholder: "Año",
      label: "",
      options: getYearsList({minYear: new Date().getFullYear(), maxYear: new Date().getFullYear() + 5}) as IFieldOption[],
      row: {
        lg: 4,
        md: 2,
        sm: 2,
        xs: 4
      },
    },
    {
      fieldId: 4,
      name: "description",
      type: "textarea",
      placeholder: "Descripción sobre el curso",
      label: "Explica y menciona todo referente al curso",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
    {
      fieldId: 5,
      name: "coursePrice",
      type: "text",
      placeholder: "Precio del curso",
      label: "Escribe el precio del curso (USD)",
      row: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
    },
  ]
