import { Col, Row } from "react-bootstrap";
import CreateAccount from "./CreateAccount/CreateAccount";
import Side from "./Side/Side";

export default function SignUpIndex() {
  return (
    <div className="overflow-hidden">
      <Row>
        <Col lg={5}>
          <Side />
        </Col>

        <Col lg={7} style={{ overflow: "auto", height: "100vh" }}>
          <CreateAccount />
        </Col>
      </Row>
    </div>
  );
}
