import { Row, Col } from "react-bootstrap";

interface IProductNameProps {
  name: string;
}

export default function ProductName({ name }: IProductNameProps) {
  return (
    <Row>
      <Col lg={12}>
        <h5>{name}</h5>
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-center">
          <div className="me-1">
            <p className="font-size-md">Color:</p>
          </div>

          <div>
            <p className="font-size-md">Azul</p>
          </div>
        </div>
      </Col>

      <Col lg={12} style={{ marginTop: "-10px" }}>
        <div className="d-flex align-items-center">
          <div className="me-1">
            <p className="font-size-md">Talla:</p>
          </div>

          <div>
            <p className="font-size-md">S</p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
