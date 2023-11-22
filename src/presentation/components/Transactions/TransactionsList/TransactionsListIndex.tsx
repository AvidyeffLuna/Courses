import { Col, Row } from "react-bootstrap";
import Transactions from "./Transactions/Transactions";
import { IGetTransactionsResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";

interface ITransactionsListIndexProps {
  transactions: IGetTransactionsResponse | ITransactionFailure;
}

export default function TransactionsListIndex({
  transactions,
}: ITransactionsListIndexProps) {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5 mt-5">
        <Col lg={12} className="mb-4">
          <h3>Tus transacciones</h3>
        </Col>

        <Col lg={12}>
          <Transactions transactions={transactions} />
        </Col>
      </Row>
    </div>
  );
}
