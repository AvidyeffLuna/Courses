import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import nookies from "nookies";
import NotificationsListIndex from "presentation/components/Notifications/NotificationsList/NotificationsListIndex";
import NotificationsProvider from "application/context/Notifications/NotificationsContext";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";

interface INotificationsListPageProps {
  isLogged: boolean;
}

const NotificationsList = ({ isLogged }: INotificationsListPageProps) => {
  return (
    <NotificationsProvider>
      <Head>
        <title>Notificaciones - {process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <NotificationsListIndex />
      </AppLayout>
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
