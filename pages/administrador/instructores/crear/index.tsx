import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import TeachersCreateIndex from "presentation/components/Admin/Teachers/TeachersCreate/TeachersCreateIndex";
import AdminLayout from "presentation/layouts/AdminLayout/AdminLayout";
import nookies from "nookies";
import TeachersCreateProvider from "application/context/Admin/Teachers/TeachersCreate/TeachersCreateContext";

interface IAdminTeachersCreatePageProps {
  isLogged: boolean;
}

const AdminTeachersCreate = ({ isLogged }: IAdminTeachersCreatePageProps) => {
  return (
    <TeachersCreateProvider>
      <Head>
        <title>Crear usuario como instructor - {process.env.appName}</title>
      </Head>

      <AdminLayout isLogged={isLogged}>
        <TeachersCreateIndex />
      </AdminLayout>
    </TeachersCreateProvider>
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

export default AdminTeachersCreate;
