import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Courses/CoursesWork/CoursesWorkContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { CoursesWorkRoutesEnum } from "presentation/routes/coursesRoutes";
import { useContext } from "react";

export default function AddDeliverableButton() {
  const { state } = useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { data: course } = state.courseState;

  const router = useRouter();

  return (
    <Link
      href={{
        pathname: CoursesWorkRoutesEnum.CoursesWork,
        query: {
          slug: course.course?.slug,
          courseTaskId: router?.query.courseTaskId,
          add_deliverable: true,
        },
      }}
    >
      <a className="btn btn-primary btn-xs" style={{ padding: "10px 15px" }}>
        <i className="fa-solid fa-plus" style={{ fontSize: "20px" }} />
      </a>
    </Link>
  );
}
