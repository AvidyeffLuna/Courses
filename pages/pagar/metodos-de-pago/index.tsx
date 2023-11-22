import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import PaymentMethodsListIndex from "presentation/components/Payments/PaymentMethods/PaymentMethodsList/PaymentMethodsListIndex";

interface IPaymentMethodsListPageProps {
  isLogged: boolean;
}

const PaymentMethodsList = ({ isLogged }: IPaymentMethodsListPageProps) => {
  return (
    <>
      <Head>
        <title>Métodos de pago - {process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <PaymentMethodsListIndex />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    return {
      props: {
        isLogged: cookies?.token?.length > 0,
      },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default PaymentMethodsList;
