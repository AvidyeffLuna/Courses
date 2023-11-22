import {
  SalesViewContext,
  ISalesViewContext,
} from "application/context/Admin/Sales/SalesView/SalesViewContext";
import { useRouter } from "next/router";
import { printLogError } from "presentation/logs/logs";
import { AdminSalesRoutesEnum } from "presentation/routes/AdminRoutes/salesRoutes";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";

export default function ApprovedRejectedSaleFormulary() {
  const { state, actions, dispatch } =
    useContext<ISalesViewContext>(SalesViewContext);
  const { approvedSale, rejectedSale } = actions;
  const { data: sale } = state.sale;
  const {
    loading: approvedLoading,
    error: approvedError,
    sucessful: approvedSucessful,
  } = state.approvedSale;
  const {
    loading: rejectedLoading,
    error: rejectedError,
    sucessful: rejectedSucessful,
  } = state.rejectedSale;

  const router = useRouter();

  const [comment, setComment] = useState("");

  const onApprovedSale = () =>
    approvedSale({
      sale: sale,
      comment: comment,
    })(dispatch);

  const onRejectedSale = () =>
    rejectedSale({
      sale: sale,
      comment: comment,
    })(dispatch);

  const handleApprovedRejectedSaleSucessful = useCallback(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      router.push({
        pathname: AdminSalesRoutesEnum.SalesList,
      });
    }, 3000);
  }, [router]);

  useEffect(() => {
    if (approvedSucessful || rejectedSucessful)
      handleApprovedRejectedSaleSucessful();
  }, [
    approvedSucessful,
    rejectedSucessful,
    handleApprovedRejectedSaleSucessful,
  ]);

  const handleApprovedRejectedSaleError = useCallback(() => {
    window.scrollTo(0, 0);

    printLogError(rejectedError ?? approvedError);
  }, [rejectedError, approvedError]);

  useEffect(() => {
    if (rejectedError || approvedError) handleApprovedRejectedSaleError();
  }, [rejectedError, approvedError, handleApprovedRejectedSaleError]);

  return (
    <Form>
      <Row>
        {rejectedSucessful && (
          <Alert variant="success" className="mb-4">
            ¡Se ha rechazado el pago de manera satisfactoria!
          </Alert>
        )}

        {approvedSucessful && (
          <Alert variant="success" className="mb-4">
            ¡Se ha aprobado el pago de manera satisfactoria!
          </Alert>
        )}

        {approvedError || rejectedError ? (
          <Alert variant="danger" className="mb-4">
            Algo no ha salido como se esperaba. Comprueba tu conexión y vuelve a
            intentarlo.
          </Alert>
        ) : (
          ""
        )}

        <Col lg={12} className="mb-5">
          <Form.Group>
            <Form.Label>Comentario</Form.Label>

            <Form.Control
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Col>

        <Col lg={6} className="mb-4">
          <Button
            type="button"
            variant="outline-primary"
            disabled={approvedLoading || rejectedLoading}
            onClick={() => onRejectedSale()}
            className="w-100"
          >
            {rejectedLoading ? (
              <Spinner
                animation="border"
                variant="light"
                className="spinner-border-light"
              />
            ) : (
              "Rechazar pago"
            )}
          </Button>
        </Col>

        <Col lg={6} className="mb-4">
          <Button
            type="button"
            variant="primary"
            disabled={approvedLoading || rejectedLoading}
            onClick={() => onApprovedSale()}
            className="w-100"
          >
            {approvedLoading ? (
              <Spinner
                animation="border"
                variant="light"
                className="spinner-border-light"
              />
            ) : (
              "Aprobar pago"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
