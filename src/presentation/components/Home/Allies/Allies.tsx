import { Col, Row } from "react-bootstrap";
import AlliesList from "./AlliesList/AlliesList";

export default function Allies() {
  return (
    <Row>
      <Col lg={12} className="text-center mb-5">
        <h2 className="text-primary">Conoce a nuestros aliados</h2>
      </Col>

      <Col lg={12} className="text-center mb-5">
        <AlliesList />
      </Col>
    </Row>
  );
}
