import { Col, Row } from "react-bootstrap";
import ProductAddToCart from "./ProductAddToCart/ProductAddToCart";
import ProductAddToWhiteList from "./ProductAddToWhiteList/ProductAddToWhiteList";
import ProductImage from "./ProductImage/ProductImage";
import ProductName from "./ProductName/ProductName";

interface IProductCardProps {
  product: any;
}

export default function ProductCard({ product }: IProductCardProps) {
  return (
    <Row>
      <Col lg={12} className="mb-3">
        <ProductImage
          pictureUrl={product.pictureUrl}
          productId={product.productId}
          productName={product.name}
        />
      </Col>

      <Col lg={12} className="mb-3">
        <ProductName
          productId={product.productId}
          name={product.name}
          price={product.price}
          discount={product.discount}
        />
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <ProductAddToCart />
          </div>

          <div>
            <ProductAddToWhiteList />
          </div>
        </div>
      </Col>
    </Row>
  );
}
