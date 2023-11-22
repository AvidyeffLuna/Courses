import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";

export default function CourseAbout() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h3>Acerca del curso</h3>
      </Col>

      <Col lg={12}>
        <p>{course.description}</p>
      </Col>
    </Row>
  );
}
