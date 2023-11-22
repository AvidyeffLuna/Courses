import { Col, Row } from "react-bootstrap";
import Students from "./Students/Students";

export default function StudentsList() {
  return (
    <Row>
      <Col lg={12} className="mb-5">
        <Students />
      </Col>
    </Row>
  );
}
