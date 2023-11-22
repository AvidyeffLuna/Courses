import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PaymentsRoutesEnum } from "presentation/routes/paymentsRoutes";
import { Card, Col, Row } from "react-bootstrap";

export default function ZelleMethod() {
  const router = useRouter();

  return (
    <Link href={PaymentsRoutesEnum.ZelleMethod}>
      <a>
        <Card>
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
                        src="/static/image/icons/zelle-icon.png"
                        alt="zelle-icon"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>

                  <div>
                    <h4>Zelle</h4>
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
