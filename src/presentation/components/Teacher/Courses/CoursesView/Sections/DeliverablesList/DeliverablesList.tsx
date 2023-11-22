import { Col, Row } from "react-bootstrap";
import Deliverables from "./Deliverables/Deliverables";
import Filters from "./Filters/Filters";

export default function DeliverablesList() {
  return (
    <Row>
      <Col lg={12}>
        <Filters />
      </Col>

      <Col lg={12}>
        <Deliverables />
      </Col>
    </Row>
  );
}
