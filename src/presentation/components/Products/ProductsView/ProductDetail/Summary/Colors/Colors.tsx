import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Colors() {
  const [colors] = useState(["#fff", "#000"]);

  return (
    <Row>
      <Col lg={12} className="mb-2">
        <h5>Colores:</h5>
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-center">
          {colors.map((color) => (
            <div key={color} className="me-2">
              <div
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "2rem",
                  boxShadow: "0 4px 30px -15px rgba(0, 0, 0, .1)",
                  border: "1px solid rgba(0, 0, 0, .1)",
                }}
              />
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}
