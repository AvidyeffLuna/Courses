import Link from "next/link";
import { useRouter } from "next/router";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";

interface ICreateLessonItemButtonProps {
  courseLessonId: string;
}

export default function CreateLessonItemButton({
  courseLessonId,
}: ICreateLessonItemButtonProps) {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: TeacherCoursesRoutesEnum.CoursesLessonsItemsCreate,
        query: { slug: router.query.slug, courseLessonId: courseLessonId },
      }}
    >
      <a className="btn btn-primary">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <i className="fa-solid fa-plus icon-white" />
          </div>

          <div>Nueva clase</div>
        </div>
      </a>
    </Link>
  );
}
