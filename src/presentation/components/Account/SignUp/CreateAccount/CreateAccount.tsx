import { Col, Row } from "react-bootstrap";
import SignUpFormulary from "./SignUpFormulary/SignUpFormulary";

export default function CreateAccount() {
  return (
    <Row className="py-5 px-5">
      <Col lg={12} className="mb-2">
        <h2>Crea una cuenta gratis</h2>
      </Col>

      <Col lg={12} className="mb-4">
        <p>Completa los campos para crear tu cuenta en {process.env.appName}</p>
      </Col>

      <Col lg={12}>
        <SignUpFormulary />
      </Col>
    </Row>
  );
}
