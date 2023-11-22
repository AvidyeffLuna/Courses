import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { IGetShoppingCartByIdResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import { Col, Row } from "react-bootstrap";
import ErrorMessage from "../common/core/Error/ErrorMessage/ErrorMessage";
import Courses from "./Courses/Courses";
import Summary from "./Summary/Summary";

interface IShoppingCartIndexProps {
  shoppingCart: IGetShoppingCartByIdResponse | IShoppingCartFailure;
}

export default function ShoppingCartIndex({
  shoppingCart,
}: IShoppingCartIndexProps) {
  if ("code" in shoppingCart) return <ErrorMessage />;

  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5 mt-5">
        <Col lg={12} className="mb-4">
          <h3>Carrito de compras</h3>
        </Col>

        <Col
          lg={shoppingCart.data.courses.length > 0 ? 8 : 12}
          className="mb-5 pe-5"
        >
          <Courses shoppingCart={shoppingCart} />
        </Col>

        {shoppingCart.data.courses.length > 0 && (
          <Col lg={4} className="mb-5">
            <Summary paidSummary={shoppingCart.data.paidSummary} />
          </Col>
        )}
      </Row>
    </div>
  );
}
