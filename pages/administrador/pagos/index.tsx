import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import SalesIndex from "presentation/components/Admin/Sales/SalesList/SalesListIndex";
import AdminLayout from "presentation/layouts/AdminLayout/AdminLayout";
import nookies from "nookies";
import SalesListProvider from "application/context/Admin/Sales/SalesList/SalesListContext";

interface IAdminSalesPageProps {
  isLogged: boolean;
}

const AdminSales = ({ isLogged }: IAdminSalesPageProps) => {
  return (
    <SalesListProvider>
      <Head>
        <title>Pagos - {process.env.appName}</title>
      </Head>

      <AdminLayout isLogged={isLogged}>
        <SalesIndex />
      </AdminLayout>
    </SalesListProvider>
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

export default AdminSales;
