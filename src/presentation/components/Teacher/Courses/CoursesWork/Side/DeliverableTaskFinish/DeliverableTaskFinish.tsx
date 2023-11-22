import { Col, Row } from "react-bootstrap";
import DeliverableTaskFinishFormulary from "./DeliverableTaskFinishFormulary/DeliverableTaskFinishFormulary";

export default function DeliverableTaskFinish() {
  return (
    <Row>
      <Col lg={12} className="mb-5">
        <h3>Dar nota final a la tarea</h3>
      </Col>

      <Col lg={12} className="mb-4">
        <DeliverableTaskFinishFormulary />
      </Col>
    </Row>
  );
}
