import { Col, Row } from "react-bootstrap";
import ProductImage from "./ProductImage/ProductImage";
import ProductName from "./ProductName/ProductName";
import ProductPrice from "./ProductPrice/ProductPrice";
import ProductQuantity from "./ProductQuantity/ProductQuantity";
import ProductTotalPrice from "./ProductTotalPrice/ProductTotalPrice";

interface IProductProps {
  product: any;
}

export default function Product({ product }: IProductProps) {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center" style={{ width: "400px" }}>
            <ProductImage pictureUrl={product.pictureUrl} />

            <div className="ms-3">
              <ProductName name={product.name} />
            </div>
          </div>

          <div>
            <ProductPrice price={product.price} />
          </div>

          <div>
            <ProductQuantity quantity={product.quantity} />
          </div>

          <div>
            <ProductTotalPrice totalPrice={product.total} />
          </div>
        </div>
      </Col>
    </Row>
  );
}
