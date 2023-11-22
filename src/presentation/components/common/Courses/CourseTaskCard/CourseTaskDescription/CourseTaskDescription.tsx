import { Col, Row } from "react-bootstrap";

interface ICourseTaskDescriptionProps {
  description: string;
}

export default function CourseTaskDescription({
  description,
}: ICourseTaskDescriptionProps) {
  return (
    <Row>
      <Col lg={12}>
        <p>{description}</p>
      </Col>
    </Row>
  );
}
