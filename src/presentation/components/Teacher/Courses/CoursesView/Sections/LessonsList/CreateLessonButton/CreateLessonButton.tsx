import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import Link from "next/link";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useContext } from "react";

export default function CreateLessonButton() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  return (
    <Link
      href={{
        pathname: TeacherCoursesRoutesEnum.CoursesLessonsCreate,
        query: { slug: course.slug },
      }}
    >
      <a className="btn btn-primary">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <i className="fa-solid fa-plus icon-white" />
          </div>

          <div>Nueva sección</div>
        </div>
      </a>
    </Link>
  );
}
