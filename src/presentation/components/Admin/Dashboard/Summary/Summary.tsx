import { Col, Row } from "react-bootstrap";
import SummaryCard from "./SummaryCard/SummaryCard";

export default function Summary() {
  return (
    <Row>
      <Col lg={6} className="mb-4">
        <SummaryCard
          icon="fa-solid fa-person icon-primary"
          title="Total de usuarios"
          value={4}
        />
      </Col>

      <Col lg={6} className="mb-4">
        <SummaryCard
          icon="fa-solid fa-person-chalkboard icon-primary"
          title="Total de instructores"
          value={4}
        />
      </Col>

      <Col lg={6} className="mb-4">
        <SummaryCard
          icon="fa-solid fa-money-bill icon-primary"
          title="Total de pagos"
          value={4}
        />
      </Col>

      <Col lg={6} className="mb-4">
        <SummaryCard
          icon="fa-solid fa-money-bill-trend-up icon-primary"
          title="Total de pagos aprobados"
          value={4}
        />
      </Col>

      <Col lg={6} className="mb-4">
        <SummaryCard
          icon="fa-solid fa-sack-xmark icon-primary"
          title="Total de pagos rechazados"
          value={4}
        />
      </Col>
    </Row>
  );
}
