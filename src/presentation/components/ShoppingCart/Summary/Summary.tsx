import { IShoppingCartPaidSummary } from "domain/core/entities/shoppingCartEntity";
import Link from "next/link";
import { PaymentsRoutesEnum } from "presentation/routes/paymentsRoutes";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { Button, Card, Col, Row } from "react-bootstrap";

interface ISummaryProps {
  paidSummary: IShoppingCartPaidSummary;
}

export default function Summary({ paidSummary }: ISummaryProps) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12} className="mb-4">
            <h3>Resumen</h3>
          </Col>

          <Col lg={12} className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="font-weight-normal">Cantidad de cursos</h5>
              </div>

              <div>
                <h5>{paidSummary.coursesQuantity}</h5>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="font-weight-normal">Total</h5>
              </div>

              <div>
                <h5>
                  {getNumberFormat({
                    value: paidSummary.totalPaid,
                    style: "currency",
                  })}
                </h5>
              </div>
            </div>
          </Col>

          <Col lg={12} className="mb-5">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h4 className="font-weight-bold">Total a pagar</h4>
              </div>

              <div>
                <h4 className="text-primary">
                  {getNumberFormat({
                    value: paidSummary.totalPaid,
                    style: "currency",
                  })}
                </h4>
              </div>
            </div>
          </Col>

          <Col lg={12} className="text-center">
            <Link
              href={{
                pathname: PaymentsRoutesEnum.PaymentMethods,
              }}
            >
              <a className="btn btn-primary w-50">Pagar</a>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
