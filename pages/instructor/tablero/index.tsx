import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherDashboardIndex from "presentation/components/Teacher/Dashboard/DashboardIndex";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import DashboardProvider from "application/context/Teacher/Dashboard/DashboardContext";

interface ITeacherDashboardPageProps {
  isLogged: boolean;
}

const TeacherDashboard = ({ isLogged }: ITeacherDashboardPageProps) => {
  return (
    <DashboardProvider>
      <Head>
        <title>Tablero - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <TeacherDashboardIndex />
      </TeacherLayout>
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

export default TeacherDashboard;
