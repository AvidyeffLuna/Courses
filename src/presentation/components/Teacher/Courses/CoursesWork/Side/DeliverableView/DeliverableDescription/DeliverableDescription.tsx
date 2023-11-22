import { Col, Row } from "react-bootstrap";

interface IDeliverableDescriptionProps {
  description: string;
}

export default function DeliverableDescription({
  description,
}: IDeliverableDescriptionProps) {
  return (
    <Row>
      <Col lg={12}>
        <p>{description}</p>
      </Col>
    </Row>
  );
}
