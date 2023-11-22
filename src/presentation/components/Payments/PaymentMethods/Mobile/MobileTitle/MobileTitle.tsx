import Image from "next/image";
import { Card } from "react-bootstrap";

export default function MobileTitle() {
  return (
    <Card style={{ height: "135px" }}>
      <Card.Body>
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
            <h4>Pagar por pago móvil</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
