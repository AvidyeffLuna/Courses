import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import UsersIndex from "presentation/components/Admin/Users/UsersList/UsersListIndex";
import AdminLayout from "presentation/layouts/AdminLayout/AdminLayout";
import nookies from "nookies";
import UsersListProvider from "application/context/Admin/Users/UsersList/UsersListContext";

interface IAdminUsersPageProps {
  isLogged: boolean;
}

const AdminUsers = ({ isLogged }: IAdminUsersPageProps) => {
  return (
    <UsersListProvider>
      <Head>
        <title>Usuarios - {process.env.appName}</title>
      </Head>

      <AdminLayout isLogged={isLogged}>
        <UsersIndex />
      </AdminLayout>
    </UsersListProvider>
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

export default AdminUsers;
