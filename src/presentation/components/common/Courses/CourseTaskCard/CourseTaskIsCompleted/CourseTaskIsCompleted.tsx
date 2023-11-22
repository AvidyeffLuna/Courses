import { Badge, Col, Row } from "react-bootstrap";

interface ICourseTaskIsCompletedProps {
  isCompleted: boolean;
}

export default function CourseTaskIsCompleted({
  isCompleted,
}: ICourseTaskIsCompletedProps) {
  return (
    <Row>
      <Col lg={12}>
        <Badge bg={isCompleted ? "success" : "warning"}>
          {isCompleted ? "Tarea completada" : "Tarea pendiente por completar"}
        </Badge>
      </Col>
    </Row>
  );
}
