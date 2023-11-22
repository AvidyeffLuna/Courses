import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import TeachersIndex from "presentation/components/Admin/Teachers/TeachersList/TeachersListIndex";
import AdminLayout from "presentation/layouts/AdminLayout/AdminLayout";
import nookies from "nookies";
import TeachersListProvider from "application/context/Admin/Teachers/TeachersList/TeachersListContext";

interface IAdminTeachersPageProps {
  isLogged: boolean;
}

const AdminTeachers = ({ isLogged }: IAdminTeachersPageProps) => {
  return (
    <TeachersListProvider>
      <Head>
        <title>Instructores - {process.env.appName}</title>
      </Head>

      <AdminLayout isLogged={isLogged}>
        <TeachersIndex />
      </AdminLayout>
    </TeachersListProvider>
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

export default AdminTeachers;
