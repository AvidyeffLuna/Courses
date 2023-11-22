import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import PaymentMethodBankTransferIndex from "presentation/components/Payments/PaymentMethods/BankTransfer/BankTransferIndex";
import PaymentBankTransferProvider from "application/context/Payments/PaymentMethods/PaymentBankTransfer/PaymentBankTransferContext";
import ShoppingCartUseCases from "domain/useCases/shoppingCart/shoppingCartUseCases";
import { IGetShoppingCartByIdResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";

interface IPaymentMethodBankTransferPageProps {
  isLogged: boolean;
  shoppingCart: IGetShoppingCartByIdResponse | IShoppingCartFailure;
}

const PaymentMethodBankTransfer = ({
  isLogged,
  shoppingCart,
}: IPaymentMethodBankTransferPageProps) => {
  return (
    <PaymentBankTransferProvider>
      <Head>
        <title>Transferencia bancaria - {process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <PaymentMethodBankTransferIndex shoppingCart={shoppingCart} />
      </AppLayout>
    </PaymentBankTransferProvider>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const shoppingCart =
      await new ShoppingCartUseCases().getShoppingCartByUserId({
        userId: cookies.userId ?? "",
      });

    return {
      props: {
        isLogged: cookies?.token?.length > 0,
        shoppingCart,
      },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default PaymentMethodBankTransfer;
