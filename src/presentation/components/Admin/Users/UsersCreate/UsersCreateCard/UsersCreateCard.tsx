import { Card, Col, Row } from "react-bootstrap";
import UsersCreateFormulary from "./UsersCreateFormulary/UsersCreateFormulary";

export default function UsersCreateCard() {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12}>
            <UsersCreateFormulary />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
