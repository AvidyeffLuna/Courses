import { Row, Col } from "react-bootstrap";

interface IProductQuantityProps {
  quantity: string;
}

export default function ProductQuantity({ quantity }: IProductQuantityProps) {
  return (
    <Row>
      <Col lg={12}>
        <h5>{quantity}</h5>
      </Col>
    </Row>
  );
}
