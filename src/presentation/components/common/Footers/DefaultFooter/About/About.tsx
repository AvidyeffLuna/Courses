import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export default function About() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <h3 className="text-white font-weight-600">NOSOTROS</h3>
      </Col>

      <Col lg={12} className="mb-3">
        <Link href="/">
          <a className="text-white font-size-lg">¿Quienes somos?</a>
        </Link>
      </Col>

      <Col lg={12} className="mb-3">
        <Link href="/">
          <a className="text-white font-size-lg">Politicas de privacidad</a>
        </Link>
      </Col>
    </Row>
  );
}
