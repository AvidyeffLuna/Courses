import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import Image from "next/image";
import { useContext } from "react";

export default function CourseImage() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  return (
    <div className="d-flex justify-content-center">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Image
          src={course.mainPictureUrl}
          alt="Course port main"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
