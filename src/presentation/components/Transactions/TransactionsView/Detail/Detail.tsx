import { IGetTransactionByIdResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import { statusColorsEnum } from "presentation/enum/status/statusEnum";
import { transactionStatusEnum } from "presentation/enum/transaction/transactionEnum";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { Badge, Card, Col, Row } from "react-bootstrap";

interface IDetailProps {
  transaction: IGetTransactionByIdResponse;
}

export default function Detail({ transaction }: IDetailProps) {
  return (
    <Row>
      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="me-5">
                <i
                  className="fa-solid fa-money-bill icon-primary"
                  style={{ fontSize: "40px" }}
                />
              </div>

              <div>
                <div>
                  <h4 className="font-weight-700">Monto de la compra</h4>
                </div>

                <div>
                  <h4 className="text-primary">
                    {getNumberFormat({
                      value: transaction.data.amount,
                      style: "currency",
                    })}
                  </h4>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="me-5">
                <i
                  className="fa-solid fa-hand-holding-dollar icon-primary"
                  style={{ fontSize: "40px" }}
                />
              </div>

              <div>
                <div>
                  <h4 className="font-weight-700">Monto de la compra (Bs)</h4>
                </div>

                <div>
                  <h4 className="text-primary">
                    {transaction.data.amountBs.toFixed(2)} Bs
                  </h4>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="me-5">
                <i
                  className="fa-solid fa-signal icon-primary"
                  style={{ fontSize: "40px" }}
                />
              </div>

              <div>
                <div>
                  <h4 className="font-weight-700">Estado del pago</h4>
                </div>

                <div>
                  <Badge bg={statusColorsEnum[transaction.data.status]}>
                    {transactionStatusEnum[transaction.data.status]}
                  </Badge>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="me-5">
                <i
                  className="fa-solid fa-calendar-day icon-primary"
                  style={{ fontSize: "40px" }}
                />
              </div>

              <div>
                <div>
                  <h4 className="font-weight-700">Fecha del pago</h4>
                </div>

                <div>
                  <p>{getFullDate(new Date(transaction.data.createdAt))}</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="me-5">
                <i
                  className="fa-solid fa-calendar-check icon-primary"
                  style={{ fontSize: "40px" }}
                />
              </div>

              <div>
                <div>
                  <h4 className="font-weight-700">Fecha de aprobación</h4>
                </div>

                <div>
                  <p>
                    {transaction.data.approvedAt
                      ? getFullDate(new Date(transaction.data.approvedAt))
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4} className="mb-4">
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="me-5">
                <i
                  className="fa-solid fa-calendar-xmark icon-primary"
                  style={{ fontSize: "40px" }}
                />
              </div>

              <div>
                <div>
                  <h4 className="font-weight-700">Fecha de rechazo</h4>
                </div>

                <div>
                  <p>
                    {transaction.data.rejectedAt
                      ? getFullDate(new Date(transaction.data.rejectedAt))
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
