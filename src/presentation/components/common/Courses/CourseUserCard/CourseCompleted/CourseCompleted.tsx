import { Badge, Col, Row } from "react-bootstrap";

interface ICourseCompletedProps {
  isCompleted: boolean;
}

export default function CourseCompleted({
  isCompleted,
}: ICourseCompletedProps) {
  return (
    <Row>
      <Col lg={12}>
        <Badge bg={isCompleted ? "success" : "warning"}>
          {isCompleted ? "Curso finalizado" : "Curso pendiente por finalizar"}
        </Badge>
      </Col>
    </Row>
  );
}
