import { Col, Row } from "react-bootstrap";
import Sections from "./Sections/Sections";
import Steps from "./Steps/Steps";

export default function CoursesCreateIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Crear curso</h3>
        </Col>

        <Col lg={12} className="d-flex justify-content-center mb-5">
          <Steps />
        </Col>

        <Col lg={12}>
          <Sections />
        </Col>
      </Row>
    </div>
  );
}
