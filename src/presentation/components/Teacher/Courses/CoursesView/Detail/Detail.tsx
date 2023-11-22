import { Col, Row } from "react-bootstrap";
import CourseTags from "./CourseTags/CourseTags";
import CourseTitle from "./CourseTitle/CourseTitle";

export default function Detail() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <CourseTags />
      </Col>

      <Col lg={12}>
        <CourseTitle />
      </Col>
    </Row>
  );
}
