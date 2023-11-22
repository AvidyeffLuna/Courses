import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import ShoppingCartIndex from "presentation/components/ShoppingCart/ShoppingCartIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import { IGetShoppingCartByIdResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import ShoppingCartUseCases from "domain/useCases/shoppingCart/shoppingCartUseCases";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import ShoppingCartProvider from "application/context/ShoppingCart/ShoppingCartContext";

interface IShoppingCartPageProps {
  isLogged: boolean;
  shoppingCart: IGetShoppingCartByIdResponse | IShoppingCartFailure;
}

const ShoppingCart = ({ isLogged, shoppingCart }: IShoppingCartPageProps) => {
  return (
    <ShoppingCartProvider>
      <Head>
        <title>Carrito de compras -{process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <ShoppingCartIndex shoppingCart={shoppingCart} />
      </AppLayout>
    </ShoppingCartProvider>
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

export default ShoppingCart;
