import Link from "next/link";
import { CoursesRoutesEnum } from "presentation/routes/coursesRoutes";
import { Col, Row } from "react-bootstrap";

export default function Influencer() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <h3 className="text-white font-weight-600">EXPLORAR</h3>
      </Col>

      <Col lg={12} className="mb-3">
        <Link
          href={{
            pathname: CoursesRoutesEnum.CoursesList,
          }}
        >
          <a className="text-white font-size-lg">Explorar cursos</a>
        </Link>
      </Col>
    </Row>
  );
}
