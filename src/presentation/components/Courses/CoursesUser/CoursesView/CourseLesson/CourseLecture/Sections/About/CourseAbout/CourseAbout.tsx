import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesUser/CoursesView/CoursesViewContext";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";

export default function CourseAbout() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: lesson } = state.lesson;
  const { data: item } = state.item;

  return (
    <Row>
      <Row className="mb-5">
        <Col lg={12} className="mb-3">
          <h3>Sobre la clase</h3>
        </Col>

        <Col lg={12}>
          <p>{item.description}</p>
        </Col>
      </Row>

      <Row>
        <Col lg={12} className="mb-3">
          <h3>¿Qué aprenderás en esta sección?</h3>
        </Col>

        <Col lg={12}>
          <p>{lesson.description}</p>
        </Col>
      </Row>
    </Row>
  );
}
