import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function ProductName() {
  const [ratings] = useState([1, 2, 3, 4, 5]);

  return (
    <Row>
      <Col lg={12}>
        <h3>Vestido corto elegante para dama</h3>
      </Col>

      <Col lg={12}>
        <h2 className="text-primary">$30.99</h2>
      </Col>

      <Col lg={12}>
        <div className="d-flex">
          {ratings.map((rating) => (
            <div key={rating} className="me-1">
              <i className="fa-regular fa-star" />
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}
