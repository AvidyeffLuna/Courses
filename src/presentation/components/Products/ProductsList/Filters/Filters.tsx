import React from "react";
import { Col, Row } from "react-bootstrap";
import Genrer from "./Genrer/Genrer";
import Prices from "./Prices/Prices";

export default function Filters() {
  return (
    <Row>
      <Col lg={12} className="mb-5">
        <Prices />
      </Col>

      <Col lg={12}>
        <Genrer />
      </Col>
    </Row>
  );
}
