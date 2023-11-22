import { Col, Row } from "react-bootstrap";
import CourseAbout from "./CourseAbout/CourseAbout";
import CourseVideo from "./CourseVideo/CourseVideo";

export default function About() {
  return (
    <Row>
      <Col lg={12} className="mb-5">
        <CourseAbout />
      </Col>

      <Col lg={12} className="mb-4">
        <CourseVideo />
      </Col>
    </Row>
  );
}
