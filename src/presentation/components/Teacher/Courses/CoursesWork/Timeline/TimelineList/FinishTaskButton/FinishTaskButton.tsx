import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { TeacherCoursesWorkRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useContext } from "react";

export default function FinishTaskButton() {
  const { state } = useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { data: course } = state.courseState;

  const router = useRouter();

  return (
    <Link
      href={{
        pathname: TeacherCoursesWorkRoutesEnum.CoursesWork,
        query: {
          slug: course.course?.slug,
          courseTaskId: router.query.courseTaskId,
          userId: router.query.userId,
          finish_task: true,
        },
      }}
    >
      <a className="btn btn-outline-primary btn-xs">Finalizar tarea</a>
    </Link>
  );
}
