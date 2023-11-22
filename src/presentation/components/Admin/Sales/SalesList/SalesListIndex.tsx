import { Col, Row } from "react-bootstrap";
import Filters from "./Filters/Filters";
import Sales from "./Sales/Sales";
import Search from "./Search/Search";

export default function SalesListIndex() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Pagos</h3>
        </Col>

        <Col lg={12} className="d-flex justify-content-end mb-5">
          <Search />
        </Col>

        <Col lg={12} className="mb-2">
          <Filters />
        </Col>

        <Col lg={12}>
          <Sales />
        </Col>
      </Row>
    </div>
  );
}
