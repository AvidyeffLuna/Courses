import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { TeacherCoursesWorkRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useContext } from "react";

export default function AddDeliverableButton() {
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
          add_deliverable: true,
        },
      }}
    >
      <a className="btn btn-primary btn-xs" style={{ padding: "7px 15px" }}>
        <i className="fa-solid fa-plus" style={{ fontSize: "20px" }} />
      </a>
    </Link>
  );
}
