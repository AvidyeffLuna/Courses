import { ITransaction } from "domain/core/entities/transactionEntity";
import { statusColorsEnum } from "presentation/enum/status/statusEnum";
import { transactionStatusEnum } from "presentation/enum/transaction/transactionEnum";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { Badge, Card, Col, Row } from "react-bootstrap";

interface ITransactionCardProps {
  transaction: ITransaction;
}

export default function TransactionCard({
  transaction,
}: ITransactionCardProps) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12} className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="text-primary">
                  {getNumberFormat({
                    value: transaction.amount,
                    style: "currency",
                  })}
                </h3>
              </div>

              <div>
                <Badge bg={statusColorsEnum[transaction.status]}>
                  {transactionStatusEnum[transaction.status]}
                </Badge>
              </div>
            </div>
          </Col>

          <Col lg={12}>
            <div className="d-flex justify-content-between">
              <div>
                <h4>Fecha del pago:</h4>
              </div>

              <div>
                <p>{getFullDate(new Date(transaction.createdAt))}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
