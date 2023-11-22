import { Col, Row, Spinner } from "react-bootstrap";

interface ILoadingProps {
  variant?: "primary" | "secondary" | "light";
}

export default function Loading({ variant = "primary" }: ILoadingProps) {
  return (
    <div className="overflow-hidden" style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col
          lg={12}
          className="d-flex align-items-center justify-content-center"
        >
          <Spinner
            animation="border"
            variant={variant}
            className={`spinner-border-${variant}`}
          />
        </Col>
      </Row>
    </div>
  );
}
