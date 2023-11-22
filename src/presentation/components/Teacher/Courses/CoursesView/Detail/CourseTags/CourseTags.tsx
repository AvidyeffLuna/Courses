import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { useContext } from "react";
import { Badge, Col, Row } from "react-bootstrap";

export default function CourseTags() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  if (course.tags.length === 0) return <div />;

  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center">
          {course.tags.map((tag) => (
            <Badge key={tag} bg="primary" className="me-3">
              {tag}
            </Badge>
          ))}
        </div>
      </Col>
    </Row>
  );
}
