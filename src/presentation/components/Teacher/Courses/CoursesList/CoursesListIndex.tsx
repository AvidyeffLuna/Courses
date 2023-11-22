import { Col, Row } from "react-bootstrap";
import Courses from "./Courses/Courses";
import CreateCourseButton from "./CreateCourseButton/CreateCourseButton";
import Filters from "./Filters/Filters";
import Search from "./Search/Search";

export default function CoursesListIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Tu listado de cursos publicados</h3>
        </Col>

        <Col lg={6} className="mb-5">
          <CreateCourseButton />
        </Col>

        <Col lg={6} className="mb-5">
          <Search />
        </Col>

        <Col lg={12} className="mb-2">
          <Filters />
        </Col>

        <Col lg={12}>
          <Courses />
        </Col>
      </Row>
    </div>
  );
}
