import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";
import { Col, Row } from "react-bootstrap";

interface IHeaderProps {
  courses: IGetCoursesUsersResponse | ICourseFailure;
}

export default function Header({ courses }: IHeaderProps) {
  if ("code" in courses) return <div />;

  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center">
          <h4 className="text-primary">{courses.data.length}</h4>
          <div className="ms-2">
            <h4> cursos en tu biblioteca</h4>
          </div>
        </div>
      </Col>
    </Row>
  );
}
