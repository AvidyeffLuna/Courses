import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TransactionsListIndex from "presentation/components/Transactions/TransactionsList/TransactionsListIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import { IGetTransactionsResponse } from "domain/core/response/transaction/transactionResponsesEntities";
import ITransactionFailure from "domain/core/failures/transaction/transactionFailure";
import TransactionUseCases from "domain/useCases/transaction/transactionUseCases";

interface ITransactionListPageProps {
  isLogged: boolean;
  transactions: IGetTransactionsResponse | ITransactionFailure;
}

const TransactionList = ({
  isLogged,
  transactions,
}: ITransactionListPageProps) => {
  return (
    <>
      <Head>
        <title>Transacciones -{process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <TransactionsListIndex transactions={transactions} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const transactions = await new TransactionUseCases().getTransactions({
      userId: cookies.userId,
    });

    return {
      props: {
        isLogged: cookies?.token?.length > 0,
        transactions,
      },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default TransactionList;
