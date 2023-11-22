import { Card, Col, Row } from "react-bootstrap";
import DeliverablesTable from "./Table/Table";

export default function LastDeliverables() {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12} className="mb-4">
            <h4>Ultimas entregas de estudiantes</h4>
          </Col>

          <Col lg={12}>
            <DeliverablesTable />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
