import { Col, Row } from "react-bootstrap";
import Products from "./Products/Products";

export default function RelatedProducts() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <h3>Productos relacionados</h3>
      </Col>

      <Col lg={12}>
        <Products />
      </Col>
    </Row>
  );
}
