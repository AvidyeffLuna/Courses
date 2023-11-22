import { Col, Row } from "react-bootstrap";
import ZelleFormulary from "./ZelleFormulary/ZelleFormulary";
import ZelleTitle from "./ZelleTitle/ZelleTitle";

export default function ReloadBalanceZelleIndex() {
  return (
    <div className="overflow-hidden w-100">
      <Row className="px-5 py-4">
        <Col lg={12} className="mb-5">
          <h2>Recargar saldo de tu monedero</h2>
        </Col>

        <Col lg={12} className="mb-5">
          <ZelleTitle />
        </Col>

        <Col lg={12}>
          <ZelleFormulary />
        </Col>
      </Row>
    </div>
  );
}
