import { Col, Row } from "react-bootstrap";
import Login from "./Login/Login";
import Side from "./Side/Side";

export default function SignInIndex() {
  return (
    <div className="overflow-hidden">
      <Row>
        <Col lg={5}>
          <Side />
        </Col>

        <Col lg={7} style={{ overflow: "auto", height: "100vh" }}>
          <Login />
        </Col>
      </Row>
    </div>
  );
}
