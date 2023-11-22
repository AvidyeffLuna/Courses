import { Col, Row } from "react-bootstrap";
import Additional from "./Additional/Additional";
import AddToCart from "./AddToCart/AddToCart";
import AddToWishlist from "./AddToWishlist/AddToWishlist";
import Colors from "./Colors/Colors";
import ProductDescription from "./ProductDescription/ProductDescription";
import ProductName from "./ProductName/ProductName";
import Quantity from "./Quantity/Quantity";

export default function Summary() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <ProductName />
      </Col>

      <Col lg={12} className="mb-1">
        <ProductDescription />
      </Col>

      <Col lg={12} className="mb-4">
        <Colors />
      </Col>

      <Col lg={12} className="mb-2">
        <Quantity />
      </Col>

      <Col lg={12} className="mb-4">
        <AddToWishlist />
      </Col>

      <Col lg={12} className="mb-4">
        <AddToCart />
      </Col>

      <Col lg={12} className="mb-4">
        <Additional />
      </Col>
    </Row>
  );
}
