import { Row, Col } from "react-bootstrap";

interface IProductPriceProps {
  price: string;
}

export default function ProductPrice({ price }: IProductPriceProps) {
  return (
    <Row>
      <Col lg={12}>
        <h5>{price}</h5>
      </Col>
    </Row>
  );
}
