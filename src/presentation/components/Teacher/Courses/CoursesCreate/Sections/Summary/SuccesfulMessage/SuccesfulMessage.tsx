import { Col, Row } from "react-bootstrap";

export default function SuccesfulMessage() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <i
          className="fa-solid fa-circle-check icon-primary"
          style={{ fontSize: "100px" }}
        />
      </Col>

      <Col lg={12}>
        <h3>¡Se ha creado tu curso de manera satisfactoria!</h3>
      </Col>
    </Row>
  );
}
