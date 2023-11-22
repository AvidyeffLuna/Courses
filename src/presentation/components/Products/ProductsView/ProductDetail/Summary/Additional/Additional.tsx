import { Col, Row } from "react-bootstrap";

export default function Additional() {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex">
          <div className="me-3 mt-1" style={{ width: "95px" }}>
            <h5>Categoria:</h5>
          </div>

          <div>
            <p>Moda</p>
          </div>
        </div>
      </Col>

      <Col lg={12}>
        <div className="d-flex">
          <div className="me-3 mt-1" style={{ width: "95px" }}>
            <h5>Especialidad:</h5>
          </div>

          <div>
            <p>Mujeres</p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
