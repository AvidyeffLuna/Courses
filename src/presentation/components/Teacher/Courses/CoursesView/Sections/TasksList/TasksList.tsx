import { Col, Row } from "react-bootstrap";
import CreateTasksButton from "./CreateTasksButton/CreateTasksButton";
import Search from "./Search/Search";
import Tasks from "./Tasks/Tasks";

export default function TasksList() {
  return (
    <Row>
      <Col lg={6} className="mb-5">
        <CreateTasksButton />
      </Col>

      <Col lg={6} className="mb-5">
        <Search />
      </Col>

      <Col lg={12}>
        <Tasks />
      </Col>
    </Row>
  );
}
