export enum CoursesRoutesEnum {
    CoursesList = "/cursos",
    CoursesView = "/curso/[slug]",
    CoursesWhiteList = "/cursos/lista-de-deseos"
}

export enum CoursesUserRoutesEnum {
    CoursesList = "/mis-cursos",
    CoursesView = "/curso/ver/[slug]"
}

export enum CoursesWorkRoutesEnum {
    CoursesWork = "/curso/ver/[slug]/tarea/[courseTaskId]",
}