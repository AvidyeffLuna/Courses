import { Col, Row } from "react-bootstrap";
import Content from "./Content/Content";
import Media from "./Media/Media";

export default function WhyWe() {
  return (
    <Row className="align-items-center">
      <Col lg={6} className="pe-5 mb-5">
        <Media />
      </Col>

      <Col lg={6}>
        <Content />
      </Col>
    </Row>
  );
}
