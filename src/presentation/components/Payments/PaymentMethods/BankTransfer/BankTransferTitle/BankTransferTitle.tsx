import Image from "next/image";
import { Card } from "react-bootstrap";

export default function BankTransferTitle() {
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
                src="/static/media/icons/bank-icon.png"
                alt="bank-transfer-icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div>
            <h4>Pagar por transferencia bancaria</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
