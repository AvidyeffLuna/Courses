import { ICourseUser } from "domain/core/entities/courseEntity";
import { Card, Col, Row } from "react-bootstrap";
import StudentImage from "./StudentImage/StudentImage";
import StudentName from "./StudentName/StudentName";

interface IStudentCardProps {
  student: ICourseUser;
}

export default function StudentCard({ student }: IStudentCardProps) {
  return (
    <Card>
      <Card.Body className="py-0 px-0">
        <Row>
          <Col lg={12}>
            <StudentImage pictureUrl={student.user?.profilePictureUrl} />
          </Col>

          <Row className="py-3 px-4">
            <Col lg={12}>
              <StudentName
                firstName={student.user?.firstName ?? ""}
                lastName={student.user?.lastName ?? ""}
                date={student.createdAt}
                isCompleted={student.isCompleted}
              />
            </Col>
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
}
