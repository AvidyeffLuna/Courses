import { Col, Row } from "react-bootstrap";
import DeliverableAddFormulary from "./DeliverableAddFormulary/DeliverableAddFormulary";

export default function DeliverableAdd() {
  return (
    <Row>
      <Col lg={12} className="mb-5">
        <h3>Nueva respuesta</h3>
      </Col>

      <Col lg={12} className="mb-4">
        <DeliverableAddFormulary />
      </Col>
    </Row>
  );
}
