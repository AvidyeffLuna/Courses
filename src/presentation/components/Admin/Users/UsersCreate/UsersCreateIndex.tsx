import { Col, Row } from "react-bootstrap";
import UsersCreateCard from "./UsersCreateCard/UsersCreateCard";

export default function UsersCreateIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Crear usuario</h3>
        </Col>

        <Col lg={12}>
          <UsersCreateCard />
        </Col>
      </Row>
    </div>
  );
}
