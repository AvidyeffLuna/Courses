import { Row, Col } from "react-bootstrap";

interface IProductTotalPriceProps {
  totalPrice: string;
}

export default function ProductTotalPrice({
  totalPrice,
}: IProductTotalPriceProps) {
  return (
    <Row>
      <Col lg={12}>
        <h5 className="text-primary">{totalPrice}</h5>
      </Col>
    </Row>
  );
}
