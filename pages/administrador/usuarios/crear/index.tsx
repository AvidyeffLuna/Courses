import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import UsersCreateIndex from "presentation/components/Admin/Users/UsersCreate/UsersCreateIndex";
import AdminLayout from "presentation/layouts/AdminLayout/AdminLayout";
import nookies from "nookies";
import UsersCreateProvider from "application/context/Admin/Users/UsersCreate/UsersCreateContext";

interface IAdminUsersCreatePageProps {
  isLogged: boolean;
}

const AdminUsersCreate = ({ isLogged }: IAdminUsersCreatePageProps) => {
  return (
    <UsersCreateProvider>
      <Head>
        <title>Crear usuario - {process.env.appName}</title>
      </Head>

      <AdminLayout isLogged={isLogged}>
        <UsersCreateIndex />
      </AdminLayout>
    </UsersCreateProvider>
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

export default AdminUsersCreate;
