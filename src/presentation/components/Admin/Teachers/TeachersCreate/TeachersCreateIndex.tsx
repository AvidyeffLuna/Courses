import { Col, Row } from "react-bootstrap";
import TeachersCreateCard from "./TeachersCreateCard/TeachersCreateCard";

export default function TeachersCreateIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Crear usuario como instructor</h3>
        </Col>

        <Col lg={12}>
          <TeachersCreateCard />
        </Col>
      </Row>
    </div>
  );
}
