import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TransactionsViewIndex from "presentation/components/Transactions/TransactionsView/TransactionsViewIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import TransactionUseCases from "domain/useCases/transaction/transactionUseCases";
import { IGetTransactionByIdResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import { IGetCoursesResponse } from "domain/core/response/course/courseResponsesEntities";
import ICourseFailure from "domain/core/failures/course/courseFailure";

interface ITransactionViewPageProps {
  isLogged: boolean;
  transaction: IGetTransactionByIdResponse | ITransactionFailure;
  courses: IGetCoursesResponse | ICourseFailure;
}

const TransactionView = ({
  isLogged,
  transaction,
  courses,
}: ITransactionViewPageProps) => {
  return (
    <>
      <Head>
        <title>Detalle de la transacción -{process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <TransactionsViewIndex transaction={transaction} courses={courses} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const transaction = await new TransactionUseCases().getTransactionById({
      transactionId: ctx.params?.transactionId
        ? ctx.params.transactionId.toString()
        : "",
    });

    const courses = await new CourseUseCases().getCourses({
      courses: transaction.data.sale?.courses,
    });

    return {
      props: {
        isLogged: cookies?.token?.length > 0,
        transaction,
        courses,
      },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default TransactionView;
