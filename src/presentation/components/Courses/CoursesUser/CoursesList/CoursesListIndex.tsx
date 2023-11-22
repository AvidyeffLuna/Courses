import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";
import { Col, Row } from "react-bootstrap";
import Courses from "./Courses/Courses";
import Header from "./Header/Header";

interface ICoursesListIndexProps {
  courses: IGetCoursesUsersResponse | ICourseFailure;
}

export default function CoursesListIndex({ courses }: ICoursesListIndexProps) {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5 mt-5">
        <Col lg={12} className="mb-5">
          <Header courses={courses} />
        </Col>

        <Col lg={12}>
          <Courses courses={courses} />
        </Col>
      </Row>
    </div>
  );
}
