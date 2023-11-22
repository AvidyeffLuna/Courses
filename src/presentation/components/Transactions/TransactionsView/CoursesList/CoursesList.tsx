import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCoursesResponse } from "domain/core/response/course/courseResponsesEntities";
import { Card, Col, Row } from "react-bootstrap";
import Courses from "./Courses/Courses";

interface ICoursesListProps {
  courses: IGetCoursesResponse | ICourseFailure;
}

export default function CoursesList({ courses }: ICoursesListProps) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12} className="mb-5">
            <h3>Cursos</h3>
          </Col>

          <Col lg={12}>
            <Courses courses={courses} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
