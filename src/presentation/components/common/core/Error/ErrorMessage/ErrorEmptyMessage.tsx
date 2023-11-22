import Image from "next/image";
import { Button, Col, Row } from "react-bootstrap";

interface IErrorEmptyMessageProps {
  title?: string;
  description?: string;
  retry?: () => void | null;
}

export default function ErrorEmptyMessage({
  title = "No hemos encontrado resultados",
  description = "No se han conseguido resultados respecto a tu solicitud.",
  retry,
}: IErrorEmptyMessageProps) {
  return (
    <div className="overflow-hidden">
      <Row className="text-center">
        <Col lg={12} className="mb-4">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
            }}
          >
            <Image
              src="/static/media/error/error-empty-message-icon.png"
              alt="error-empty-message-icon"
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
