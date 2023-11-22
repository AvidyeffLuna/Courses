import { Col, Row } from "react-bootstrap";
import SignInFormulary from "./SignInFormulary/SignInFormulary";

export default function Login() {
  return (
    <Row className="py-5 px-5">
      <Col lg={12} className="mb-5">
        <h2>Acceder a tu cuenta como administrador</h2>
      </Col>

      <Col lg={12}>
        <SignInFormulary />
      </Col>
    </Row>
  );
}
