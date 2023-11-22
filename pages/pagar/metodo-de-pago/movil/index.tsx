import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import PaymentMethodMobileIndex from "presentation/components/Payments/PaymentMethods/Mobile/MobileIndex";
import PaymentMobileProvider from "application/context/Payments/PaymentMethods/PaymentMobile/PaymentMobileContext";
import ShoppingCartUseCases from "domain/useCases/shoppingCart/shoppingCartUseCases";
import { IGetShoppingCartByIdResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";

interface IPaymentMethodMobilePageProps {
  isLogged: boolean;
  shoppingCart: IGetShoppingCartByIdResponse | IShoppingCartFailure;
}

const PaymentMethodMobile = ({
  isLogged,
  shoppingCart,
}: IPaymentMethodMobilePageProps) => {
  return (
    <PaymentMobileProvider>
      <Head>
        <title>Pago móvil - {process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <PaymentMethodMobileIndex shoppingCart={shoppingCart} />
      </AppLayout>
    </PaymentMobileProvider>
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

export default PaymentMethodMobile;
