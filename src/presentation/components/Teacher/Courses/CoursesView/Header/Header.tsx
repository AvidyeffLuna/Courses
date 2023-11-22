import { Col, Row } from "react-bootstrap";
import Detail from "./Detail/Detail";
import Summary from "./Summary/Summary";

export default function Header() {
  return (
    <Row>
      <Col lg={6} className="mb-2">
        <Detail />
      </Col>

      <Col lg={6} className="mb-2">
        <Summary />
      </Col>
    </Row>
  );
}
