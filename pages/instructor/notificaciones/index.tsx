import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import nookies from "nookies";
import NotificationsListIndex from "presentation/components/Teacher/Notifications/NotificationsList/NotificationsListIndex";
import NotificationsProvider from "application/context/Teacher/Notifications/NotificationsContext";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";

interface INotificationsListPageProps {
  isLogged: boolean;
}

const NotificationsList = ({ isLogged }: INotificationsListPageProps) => {
  return (
    <NotificationsProvider>
      <Head>
        <title>Notificaciones - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <NotificationsListIndex />
      </TeacherLayout>
    </NotificationsProvider>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    return {
      props: { isLogged: cookies?.token?.length > 0 },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default NotificationsList;
