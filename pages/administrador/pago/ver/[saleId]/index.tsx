import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import SalesViewIndex from "presentation/components/Admin/Sales/SalesView/SalesViewIndex";
import AdminLayout from "presentation/layouts/AdminLayout/AdminLayout";
import nookies from "nookies";
import SalesViewProvider from "application/context/Admin/Sales/SalesView/SalesViewContext";

interface IAdminSalesViewPageProps {
  isLogged: boolean;
}

const AdminSalesView = ({ isLogged }: IAdminSalesViewPageProps) => {
  return (
    <SalesViewProvider>
      <Head>
        <title>Detalle del pago - {process.env.appName}</title>
      </Head>

      <AdminLayout isLogged={isLogged}>
        <SalesViewIndex />
      </AdminLayout>
    </SalesViewProvider>
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

export default AdminSalesView;
