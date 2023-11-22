import { Card, Col, Row } from "react-bootstrap";
import TeachersCreateFormulary from "./TeachersCreateFormulary/TeachersCreateFormulary";

export default function TeachersCreateCard() {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12}>
            <TeachersCreateFormulary />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
