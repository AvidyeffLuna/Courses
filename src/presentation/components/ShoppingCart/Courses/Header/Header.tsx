import { Col, Row } from "react-bootstrap";

export default function Header() {
  return (
    <Row
      className="py-2"
      style={{ borderBottom: "1px solid rgba(0, 0, 0, .1)" }}
    >
      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-between">
          <div style={{ width: "400px" }}>
            <h4>Cursos a pagar</h4>
          </div>
        </div>
      </Col>
    </Row>
  );
}
