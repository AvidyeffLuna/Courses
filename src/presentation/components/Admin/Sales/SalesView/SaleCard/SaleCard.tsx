import {
  ISalesViewContext,
  SalesViewContext,
} from "application/context/Admin/Sales/SalesView/SalesViewContext";
import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ApprovedRejectedSale from "./ApprovedRejectedSale/ApprovedRejectedSale";
import Details from "./Details/Details";

export default function SaleCard() {
  const { state } = useContext<ISalesViewContext>(SalesViewContext);
  const { data: sale } = state.sale;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12} className="mb-4">
            <Details />
          </Col>

          {sale.status === "pending" && (
            <Col lg={12} className="mb-4">
              <ApprovedRejectedSale />
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
