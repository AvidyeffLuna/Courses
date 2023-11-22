import Link from "next/link";
import { CoursesRoutesEnum } from "presentation/routes/coursesRoutes";
import { Col, Row } from "react-bootstrap";

export default function Content() {
  return (
    <Row className="pe-5">
      <Col lg={12} className="mb-4">
        <h2 className="text-primary">Educate con nosotros</h2>
      </Col>

      <Col lg={12} className="mb-4">
        <p>
          Nuestros cursos son totalmente eficaces, ayudando a nuestros
          estudiantes a mejorar y crecer como profesionales. Hacemos que
          nuestros cursos sean accesibles, economicos y con un contenido
          especializado para nuestros estudiantes.
        </p>
      </Col>

      <Col lg={12} className="mb-4">
        <p>
          Explora nuestros cursos y ponte en contacto con nosotros para empezar
          a tener acceso a nuestro contenido al mejor precio
        </p>
      </Col>

      <Col lg={12}>
        <Link
          href={{
            pathname: CoursesRoutesEnum.CoursesList,
          }}
        >
          <a className="btn btn-primary py-3 px-5">Explorar cursos</a>
        </Link>
      </Col>
    </Row>
  );
}
