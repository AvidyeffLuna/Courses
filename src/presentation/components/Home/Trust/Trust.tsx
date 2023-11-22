import { Col, Row } from "react-bootstrap";
import Content from "./Content/Content";
import Media from "./Media/Media";

export default function Trust() {
  return (
    <Row className="align-items-center">
      <Col lg={12} className="text-center mb-5">
        <h2 className="text-primary">¿Por qué confiar en nosotros?</h2>
      </Col>

      <Col lg={6}>
        <Media />
      </Col>

      <Col lg={6}>
        <Content />
      </Col>
    </Row>
  );
}
