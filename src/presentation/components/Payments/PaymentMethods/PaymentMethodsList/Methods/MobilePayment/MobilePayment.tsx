import Image from "next/image";
import Link from "next/link";
import { PaymentsRoutesEnum } from "presentation/routes/paymentsRoutes";
import { Card, Col, Row } from "react-bootstrap";

export default function MobilePayment() {
  return (
    <Link href={PaymentsRoutesEnum.MobilePaymentMethod}>
      <a>
        <Card className="card--link">
          <Card.Body>
            <Row>
              <Col lg={12}>
                <div className="d-flex align-items-center">
                  <div className="me-4">
                    <div
                      style={{
                        position: "relative",
                        width: "48px",
                        height: "48px",
                      }}
                    >
                      <Image
                        src="/static/media/icons/mobile-payment-icon.png"
                        alt="mobile-payment-icon"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>

                  <div>
                    <h4>Pago móvil</h4>
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
