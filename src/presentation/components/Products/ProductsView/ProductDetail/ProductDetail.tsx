import { Col, Row } from "react-bootstrap";
import Media from "./Media/Media";
import Summary from "./Summary/Summary";

export default function ProductDetail() {
  return (
    <Row>
      <Col lg={5}>
        <Media />
      </Col>

      <Col lg={7}>
        <Summary />
      </Col>
    </Row>
  );
}
