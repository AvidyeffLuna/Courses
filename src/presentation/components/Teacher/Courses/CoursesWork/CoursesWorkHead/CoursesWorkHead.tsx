import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import Head from "next/head";
import { useContext } from "react";

export default function CoursesWorkHead() {
  const { state } = useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { data: course } = state.courseState;

  return (
    <Head>
      <title>
        {course.courseId ? course.course?.name + " - " : ""}{" "}
        {process.env.appName}
      </title>
    </Head>
  );
}
