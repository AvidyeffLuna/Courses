import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import DashboardIndex from "presentation/components/Admin/Dashboard/DashboardIndex";
import AdminLayout from "presentation/layouts/AdminLayout/AdminLayout";
import nookies from "nookies";
import DashboardProvider from "application/context/Admin/Dashboard/DashboardContext";

interface IAdminDashboardPageProps {
  isLogged: boolean;
}

const AdminDashboard = ({ isLogged }: IAdminDashboardPageProps) => {
  return (
    <DashboardProvider>
      <Head>
        <title>Tablero - {process.env.appName}</title>
      </Head>

      <AdminLayout isLogged={isLogged}>
        <DashboardIndex />
      </AdminLayout>
    </DashboardProvider>
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

export default AdminDashboard;
