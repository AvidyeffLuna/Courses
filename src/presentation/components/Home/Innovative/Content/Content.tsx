import { Col, Row } from "react-bootstrap";

export default function Content() {
  return (
    <Row className="pe-5">
      <Col lg={12} className="mb-4">
        <h2 className="text-primary">Aprende en {process.env.appName}</h2>
      </Col>

      <Col lg={12} className="mb-4">
        <p>
          Simplifique colaborativamente sus conocimientos con nuestros cursos.
          Tu preocupación por tu futuro nos importa, es por ello, que es nuestra
          misión y objetivo fortalecer tus conocimientos y prepararte como
          profesional con nuestro contenido.
        </p>
      </Col>

      <Col lg={12} className="mb-5">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <i
              className="fa-solid fa-circle-check icon-primary"
              style={{ fontSize: "20px" }}
            />
          </div>

          <div className="mt-2">
            <p className="font-size-md font-weight-500">
              Nuestro entorno de aprendizaje único genera crecimiento
              profesional.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <i
              className="fa-solid fa-circle-check icon-primary"
              style={{ fontSize: "20px" }}
            />
          </div>

          <div className="mt-2">
            <p className="font-size-md font-weight-500">
              Descubre nuestro plan de estudios especializado para ti.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <i
              className="fa-solid fa-circle-check icon-primary"
              style={{ fontSize: "20px" }}
            />
          </div>

          <div className="mt-2">
            <p className="font-size-md font-weight-500">
              Explora variedad de cursos y inicia el plan de estudio con
              facilidad.
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
