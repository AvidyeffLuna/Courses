import { Col, Row } from "react-bootstrap";

interface IDeliverableTitleProps {
  title: string;
}

export default function DeliverableTitle({ title }: IDeliverableTitleProps) {
  return (
    <Row>
      <Col lg={12}>
        <h4>{title}</h4>
      </Col>
    </Row>
  );
}
