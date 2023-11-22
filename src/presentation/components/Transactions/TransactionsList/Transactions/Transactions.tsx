import { ITransaction } from "domain/core/entities/transactionEntity";
import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";
import { IGetTransactionsResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import { TransactionsRoutesEnum } from "presentation/routes/transactionsRoutes";
import { Col, Row } from "react-bootstrap";
import TransactionCard from "./TransactionCard/TransactionCard";

interface ITransactionsProps {
  transactions: IGetTransactionsResponse | ITransactionFailure;
}

export default function Transactions({ transactions }: ITransactionsProps) {
  const router = useRouter();

  if ("code" in transactions) return <ErrorMessage />;

  if (transactions.data.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No posees transacciones en estos momentos"
        description="No posees lista de transacciones actualmente"
      />
    );
  }

  return (
    <Row>
      {transactions.data.map((transaction: ITransaction) => (
        <Col key={transaction.transactionId} lg={6} className="mb-4">
          <Link
            href={{
              pathname: TransactionsRoutesEnum.TransactionsView,
              query: { transactionId: transaction.transactionId },
            }}
          >
            <a>
              <TransactionCard transaction={transaction} />
            </a>
          </Link>
        </Col>
      ))}

      <Col lg={12} className="d-flex justify-content-end mt-4">
        <Paginate
          page={router.query?.page ? router.query.page.toString() : "1"}
          limit={transactions.metadata.limit ?? 0}
          total={transactions.metadata.total ?? 0}
        />
      </Col>
    </Row>
  );
}
