import Image from "next/image";
import { Button, Col, Row } from "react-bootstrap";

interface IErrorMessageProps {
  title?: string;
  description?: string;
  retry?: () => void | null;
}

export default function ErrorMessage({
  title = "Algo no ha salido como se esperaba",
  description = "Lo sentimos, ha ocurrido algo inésperado al procesar su solicitud. Intentalo de nuevo.",
  retry,
}: IErrorMessageProps) {
  return (
    <div className="overflow-hidden">
      <Row className="text-center">
        <Col lg={12} className="mb-4">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "350px",
            }}
          >
            <Image
              src="/static/image/error/error-message-icon.png"
              alt="error-message-icon"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </Col>

        <Col lg={12}>
          <h3>{title}</h3>
        </Col>

        <Col lg={12} className="mb-4">
          <p>{description}</p>
        </Col>

        {retry && (
          <Col lg={12} className="mb-4">
            <Button
              type="button"
              variant="primary"
              className="py-2 px-5"
              onClick={retry}
            >
              Volver a intentar
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
}
