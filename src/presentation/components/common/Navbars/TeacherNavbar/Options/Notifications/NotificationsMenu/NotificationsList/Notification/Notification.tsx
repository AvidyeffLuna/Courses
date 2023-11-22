import { INotification } from "domain/core/entities/notificationEntity";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

interface INotificationProps {
  notification: INotification;
}

export default function Notification({ notification }: INotificationProps) {
  return (
    <Link href={window.location.origin + notification.url}>
      <a>
        <Row>
          <Col lg={12}>
            <div className="d-flex align-items-center">
              <div className="me-4">
                {!notification.readAt && (
                  <div
                    className="py-2 px-2 bg-primary"
                    style={{ borderRadius: "2rem" }}
                  />
                )}
              </div>

              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5>{notification.title}</h5>
                  </div>
                </div>

                <div>
                  <p className="font-size-xs">{notification.description}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </a>
    </Link>
  );
}
