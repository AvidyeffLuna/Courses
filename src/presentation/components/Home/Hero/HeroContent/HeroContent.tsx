import Link from "next/link";
import { CoursesRoutesEnum } from "presentation/routes/coursesRoutes";
import { Col, Row } from "react-bootstrap";

export default function HeroContent() {
  return (
    <Row className="pe-5">
      <Col lg={12} className="mb-4">
        <h2 className="text-white">
          Comience con el mejor curso y obtenga un trabajo brillante en el
          futuro.
        </h2>
      </Col>

      <Col lg={12} className="mb-4">
        <p className="text-white">
          Deje que su creatividad brille y comience a morder su futuro hoy e
          impresione a su audiencia.
        </p>
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-center">
          <div>
            <Link
              href={{
                pathname: CoursesRoutesEnum.CoursesList,
              }}
            >
              <a className="btn btn-primary py-3 px-5">Explorar cursos</a>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
}
