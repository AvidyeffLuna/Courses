import { Col, Row } from "react-bootstrap";
import MobilePayment from "./MobilePayment/MobilePayment";
import TransferMethod from "./TranferMethod/TransferMethod";

export default function Methods() {
  return (
    <Row>
      <Col lg={4} className="mb-4">
        <TransferMethod />
      </Col>

      <Col lg={4} className="mb-4">
        <MobilePayment />
      </Col>

      {/* <Col lg={4} className="mb-4">
        <USDTMethod />
      </Col>

      <Col lg={4} className="mb-4">
        <ZelleMethod />
      </Col>

  

      <Col lg={4} className="mb-4">
        <CreditCard />
  </Col> */}
    </Row>
  );
}
