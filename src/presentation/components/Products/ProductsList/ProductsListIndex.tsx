import { Col, Row } from "react-bootstrap";
import Filters from "./Filters/Filters";
import Header from "./Header/Header";
import Products from "./Products/Products";

export default function ProductsListIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-4">
        <Col lg={12} className="mb-4">
          <Header />
        </Col>

        <Col lg={3} className="mb-5">
          <Filters />
        </Col>

        <Col lg={9} className="mb-5">
          <Products />
        </Col>
      </Row>
    </div>
  );
}
