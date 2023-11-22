import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { IGetShoppingCartByIdResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AmountChange from "./AmountChange/AmountChange";
import BankTransferFormulary from "./BankTransferFormulary/BankTransferFormulary";
import BankTransferTitle from "./BankTransferTitle/BankTransferTitle";

interface IBankTransferIndexProps {
  shoppingCart: IGetShoppingCartByIdResponse | IShoppingCartFailure;
}

export default function BankTransferIndex({
  shoppingCart,
}: IBankTransferIndexProps) {
  const { state, actions, dispatch } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actions;
  const { data: user, loading, error } = state.user;

  if (loading || !user)
    return (
      <div style={{ height: "800px" }}>
        <Loading />
      </div>
    );

  if (error) return <ErrorMessage retry={getUserAuthenticated()(dispatch)} />;

  if ("code" in shoppingCart) return <ErrorMessage />;

  return (
    <div className="overflow-hidden w-100">
      <Row className="px-5 py-5 mt-5">
        <Col lg={12} className="mb-5">
          <h3>Facturación</h3>
        </Col>

        <Col lg={5} className="mb-5">
          <BankTransferTitle />
        </Col>

        <Col lg={7} className="mb-5">
          <AmountChange amount={shoppingCart.data.paidSummary.totalPaid} />
        </Col>

        <Col lg={12} className="mt-4">
          <BankTransferFormulary shoppingCart={shoppingCart} />
        </Col>
      </Row>
    </div>
  );
}
