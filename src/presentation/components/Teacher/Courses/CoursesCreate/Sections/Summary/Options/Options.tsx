import {
  CoursesCreateContext,
  ICoursesCreateContext,
} from "application/context/Teacher/Courses/CoursesCreate/CoursesCreateContext";
import Link from "next/link";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";

export default function Options() {
  const { state } = useContext<ICoursesCreateContext>(CoursesCreateContext);
  const { data: course } = state.course;

  return (
    <Row>
      <Col lg={12}>
        <Link
          href={{
            pathname: TeacherCoursesRoutesEnum.CoursesView,
            query: {
              slug: course.slug,
            },
          }}
        >
          <a className="btn btn-primary py-2 px-5">Ver mi curso</a>
        </Link>
      </Col>
    </Row>
  );
}
