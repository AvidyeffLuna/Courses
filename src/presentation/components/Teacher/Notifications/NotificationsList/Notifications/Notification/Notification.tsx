import { INotification } from "domain/core/entities/notificationEntity";
import Link from "next/link";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { Card, Col, Row } from "react-bootstrap";

interface INotificationProps {
  notification: INotification;
}

export default function Notification({ notification }: INotificationProps) {
  return (
    <Link href={window.location.origin + notification.url}>
      <a>
        <Card className="card--link">
          <Card.Body>
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
                        <h4>{notification.title}</h4>
                      </div>

                      <div>
                        <p className="font-weight-normal">
                          {getFullDate(notification.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p>{notification.description}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
}
