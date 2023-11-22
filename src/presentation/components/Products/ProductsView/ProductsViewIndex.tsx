import React from "react";
import { Col, Row } from "react-bootstrap";
import Comments from "./Comments/Comments";
import ProductDetail from "./ProductDetail/ProductDetail";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

export default function ProductsViewIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-4">
        <Col lg={12} className="mb-5 pb-5">
          <ProductDetail />
        </Col>

        <Col lg={12} className="mb-5 pb-5">
          <Comments />
        </Col>

        <Col lg={12} className="mb-4 pb-5">
          <RelatedProducts />
        </Col>
      </Row>
    </div>
  );
}
