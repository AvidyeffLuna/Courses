import { Col, Row } from "react-bootstrap";
import Methods from "./Methods/Methods";

export default function PaymentMethodsListIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5 mt-5">
        <Col lg={12} className="mb-4">
          <h3>Métodos de pago</h3>
        </Col>

        <Col lg={12} className="mb-5 pe-5">
          <Methods />
        </Col>
      </Row>
    </div>
  );
}
