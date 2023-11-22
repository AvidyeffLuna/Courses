export enum TeacherCoursesRoutesEnum {
    CoursesList = "/instructor/cursos",
    CoursesView = "/instructor/curso/[slug]",
    CoursesCreate = "/instructor/cursos/crear",
    CoursesLessonsCreate = "/instructor/curso/[slug]/secciones/crear",
    CoursesLessonsItemsCreate = "/instructor/curso/[slug]/seccion/[courseLessonId]/clases/crear",
    CoursesLessonsItemsEdit = "/instructor/curso/[slug]/seccion/[courseLessonId]/clase/[courseItemId]/editar",
    CoursesTasksCreate = "/instructor/curso/[slug]/tareas/crear",
}

export enum TeacherCoursesWorkRoutesEnum {
    CoursesWork = "/instructor/curso/[slug]/tarea/[courseTaskId]",
}