import { Col, Row } from "react-bootstrap";
import LastDeliverables from "./LastDeliverables/LastDeliverables";
import Summary from "./Summary/Summary";

export default function DashboardIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-5">
          <Summary />
        </Col>

        <Col lg={12} className="mb-5">
          <LastDeliverables />
        </Col>
      </Row>
    </div>
  );
}
