import { Col, Row } from "react-bootstrap";
import CourseAbout from "./CourseAbout/CourseAbout";

export default function About() {
  return (
    <Row>
      <Col lg={12} className="mb-5">
        <CourseAbout />
      </Col>
    </Row>
  );
}
