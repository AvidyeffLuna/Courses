import { Col, Row } from "react-bootstrap";
import MainPicture from "./MainPicture/MainPicture";
import Pictures from "./Pictures/Pictures";

export default function Media() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <MainPicture />
      </Col>

      <Col lg={12}>
        <Pictures />
      </Col>
    </Row>
  );
}
