import { getFullDate } from "presentation/utils/dates/datesUtils";
import { Badge, Col, Row } from "react-bootstrap";

interface IStudentNameProps {
  firstName: string;
  lastName: string;
  date: Date;
  isCompleted: boolean;
}

export default function StudentName({
  firstName,
  lastName,
  date,
  isCompleted,
}: IStudentNameProps) {
  return (
    <Row>
      <Col lg={12}>
        <h4>
          {firstName} {lastName}
        </h4>
      </Col>

      <Col lg={12} className="mb-3">
        <Badge bg={isCompleted ? "success" : "warning"}>
          {isCompleted
            ? "Finalizó el curso"
            : "Pendiente por finalizar el curso"}
        </Badge>
      </Col>

      <Col lg={12}>
        <p className="font-size-md">
          En el curso desde el {getFullDate(new Date(date))}
        </p>
      </Col>
    </Row>
  );
}
