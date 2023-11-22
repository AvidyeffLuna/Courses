import Link from "next/link";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";

export default function CreateCourseButton() {
  return (
    <Link
      href={{
        pathname: TeacherCoursesRoutesEnum.CoursesCreate,
      }}
    >
      <a className="btn btn-primary">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <i className="fa-solid fa-plus icon-white" />
          </div>

          <div>Nuevo curso</div>
        </div>
      </a>
    </Link>
  );
}
