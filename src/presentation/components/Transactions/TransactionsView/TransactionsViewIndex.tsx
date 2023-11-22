import ICourseFailure from "domain/core/failures/course/courseFailure";
import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";
import { IGetCoursesResponse } from "domain/core/response/course/courseResponsesEntities";
import { IGetTransactionByIdResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import { Col, Row } from "react-bootstrap";
import CoursesList from "./CoursesList/CoursesList";
import Detail from "./Detail/Detail";

interface ITransactionsViewIndexProps {
  transaction: IGetTransactionByIdResponse | ITransactionFailure;
  courses: IGetCoursesResponse | ICourseFailure;
}

export default function TransactionsViewIndex({
  transaction,
  courses,
}: ITransactionsViewIndexProps) {
  if ("code" in transaction) return <ErrorMessage />;

  if (!transaction.data?.transactionId) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado la transacción"
        description="No se ha podido encontrar el transacción. Es posible que haya sido eliminada"
      />
    );
  }

  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5 mt-5">
        <Col lg={12} className="mb-4">
          <h3>Detalle de la transacción</h3>
        </Col>

        <Col lg={12} className="mb-5">
          <Detail transaction={transaction} />
        </Col>

        <Col lg={12} className="mb-5">
          <CoursesList courses={courses} />
        </Col>
      </Row>
    </div>
  );
}
