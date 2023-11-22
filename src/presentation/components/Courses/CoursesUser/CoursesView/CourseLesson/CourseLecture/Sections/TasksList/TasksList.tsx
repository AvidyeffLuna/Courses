import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import { Col, Row } from "react-bootstrap";
import Tasks from "./Tasks/Tasks";

interface ITasksListProps {
  course: IGetCourseUserByIdResponse;
}

export default function TasksList({ course }: ITasksListProps) {
  return (
    <Row>
      <Col lg={12}>
        <Tasks course={course} />
      </Col>
    </Row>
  );
}
