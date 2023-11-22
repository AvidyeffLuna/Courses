import Link from "next/link";
import { Col, Row } from "react-bootstrap";

export default function Resources() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <h3 className="text-white font-weight-600">CUENTA</h3>
      </Col>

      <Col lg={12} className="mb-3">
        <Link href="/">
          <a className="text-white font-size-lg">Mi cuenta</a>
        </Link>
      </Col>

      <Col lg={12} className="mb-3">
        <Link href="/">
          <a className="text-white font-size-lg">Mi carrito de compras</a>
        </Link>
      </Col>

      <Col lg={12} className="mb-3">
        <Link href="/">
          <a className="text-white font-size-lg">Mi lista de deseos</a>
        </Link>
      </Col>
    </Row>
  );
}
