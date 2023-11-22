import Link from "next/link";
import { NotificationsRoutesEnum } from "presentation/routes/notificationsRoutes";
import { Col, Row } from "react-bootstrap";
import NotificationsList from "./NotificationsList/NotificationsList";
import * as Styles from "./NotificationsMenuStyles";

export default function NotificationsMenu() {
  return (
    <Row className="py-2">
      <Col lg={12} className="px-4 mb-4">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h3>Notificaciones</h3>
          </div>

          <div>
            <Link href={{ pathname: NotificationsRoutesEnum.Notifications }}>
              <a>Ver todas</a>
            </Link>
          </div>
        </div>
      </Col>

      <Styles.NotificationsMenuWrapper>
        <NotificationsList />
      </Styles.NotificationsMenuWrapper>
    </Row>
  );
}
