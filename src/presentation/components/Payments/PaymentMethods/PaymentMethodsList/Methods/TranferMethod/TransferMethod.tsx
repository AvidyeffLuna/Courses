import Image from "next/image";
import Link from "next/link";
import { PaymentsRoutesEnum } from "presentation/routes/paymentsRoutes";
import { Card, Col, Row } from "react-bootstrap";

export default function TransferMethod() {
  return (
    <Link href={PaymentsRoutesEnum.TransferMethod}>
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
                        src="/static/media/icons/bank-icon.png"
                        alt="bank-icon"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>

                  <div>
                    <h4>Transferencia</h4>
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
