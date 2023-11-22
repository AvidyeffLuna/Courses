import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import HomeIndex from "presentation/components/Home/HomeIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";

interface IHomePageProps {
  isLogged: boolean;
}

const Home = ({ isLogged }: IHomePageProps) => {
  return (
    <>
      <Head>
        <title>{process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged} showWhatsappButton>
        <HomeIndex />
      </AppLayout>
    </>
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

export default Home;
