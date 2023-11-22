import { Col, Row } from "react-bootstrap";
import CourseImage from "./CourseImage/CourseImage";

export default function Detail() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <CourseImage />
      </Col>
    </Row>
  );
}
