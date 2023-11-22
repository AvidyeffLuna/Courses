import { Col, Row } from "react-bootstrap";
import ServicesList from "./ServicesList/ServicesList";

export default function Services() {
  return (
    <Row>
      <Col lg={12} className="text-center mb-3">
        <h2 className="text-primary">Conoce nuestros servicios</h2>
      </Col>

      <Col lg={12} className="text-center mb-5">
        <p>
          Nos enfocamos en ofrecer servicios técnologicos para nuestros clientes
          con la mayor efectividad.
        </p>
      </Col>

      <Col lg={12}>
        <ServicesList />
      </Col>
    </Row>
  );
}
