import { Col, Row } from "react-bootstrap";
import CreateLessonButton from "./CreateLessonButton/CreateLessonButton";
import Lessons from "./Lessons/Lessons";
import Search from "./Search/Search";

export default function LessonsList() {
  return (
    <Row>
      <Col lg={6} className="mb-5">
        <CreateLessonButton />
      </Col>

      <Col lg={6} className="mb-5">
        <Search />
      </Col>

      <Col lg={12}>
        <Lessons />
      </Col>
    </Row>
  );
}
