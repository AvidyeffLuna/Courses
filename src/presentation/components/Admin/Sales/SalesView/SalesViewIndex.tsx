import {
  ISalesViewContext,
  SalesViewContext,
} from "application/context/Admin/Sales/SalesView/SalesViewContext";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import SaleCard from "./SaleCard/SaleCard";

export default function SalesViewIndex() {
  const { state, actions, dispatch } =
    useContext<ISalesViewContext>(SalesViewContext);
  const { getSaleById } = actions;
  const { data: sale, loading, sucessful, error } = state.sale;

  const router = useRouter();

  const getSaleByIdDispatch = useCallback(() => {
    getSaleById({ saleId: router.query.saleId ?? "" })(dispatch);
  }, [dispatch, getSaleById, router.query.saleId]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getSaleByIdDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getSaleByIdDispatch]);

  if (loading)
    return (
      <div style={{ height: "80vh" }}>
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorMessage retry={getSaleByIdDispatch} />
      </div>
    );

  if (!sale.saleId && sucessful) {
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorMessage
          title="No se ha encontrado el pago"
          description="No hemos podido encontrar el pago, puede que haya sido eliminado"
          retry={getSaleByIdDispatch}
        />
      </div>
    );
  }

  if (!sale.saleId && !sucessful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Resumen del pago</h3>
        </Col>

        <Col lg={12}>
          <SaleCard />
        </Col>
      </Row>
    </div>
  );
}
