import { Col, Row } from "react-bootstrap";
import GoogleProvider from "./GoogleProvider/GoogleProvider";

export default function Providers() {
  return (
    <Row>
      <Col lg={12}>
        <GoogleProvider />
      </Col>
    </Row>
  );
}
