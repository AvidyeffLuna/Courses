import { Col, Row } from "react-bootstrap";
import Notifications from "./Notifications/Notifications";

export default function NotificationsListIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-5">
          <h3>Notificaciones</h3>
        </Col>

        <Col lg={12} className="mb-5">
          <Notifications />
        </Col>
      </Row>
    </div>
  );
}
