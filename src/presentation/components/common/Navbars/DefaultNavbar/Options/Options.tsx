import { Col, Row } from "react-bootstrap";
import Notifications from "./Notifications/Notifications";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

interface IOptionsProps {
  isLogged: boolean;
}

export default function Options({ isLogged }: IOptionsProps) {
  if (!isLogged) return <div />;

  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center">
          <div className="me-4">
            <Notifications />
          </div>

          <div>
            <ShoppingCart />
          </div>
        </div>
      </Col>
    </Row>
  );
}
