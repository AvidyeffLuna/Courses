import { Col, Row } from "react-bootstrap";

export default function Content() {
  return (
    <Row className="pe-5">
      <Col lg={12} className="mb-4">
        <h2 className="text-white">¡Contacta con nosotros y empieza ahora!</h2>
      </Col>

      <Col lg={12} className="mb-4">
        <p className="text-white">
          Al ponerte en contacto con nosotros, tendrás acceso a poseer nuestros
          cursos al mejor precio
        </p>
      </Col>
    </Row>
  );
}
