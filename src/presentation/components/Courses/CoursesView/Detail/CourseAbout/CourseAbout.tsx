import { Col, Row } from "react-bootstrap";

interface ICourseAboutProps {
  description: string;
}

export default function CourseAbout({ description }: ICourseAboutProps) {
  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h3>Acerca del curso</h3>
      </Col>

      <Col lg={12}>
        <p>{description}</p>
      </Col>
    </Row>
  );
}
