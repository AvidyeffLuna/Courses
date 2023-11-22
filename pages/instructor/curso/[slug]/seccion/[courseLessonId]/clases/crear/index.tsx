import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import CoursesItemsCreateIndex from "presentation/components/Teacher/Courses/CoursesItems/CoursesItemsCreate/CoursesItemsCreateIndex";
import CoursesItemsCreateProvider from "application/context/Teacher/Courses/CousesItems/CoursesItemsCreate/CoursesItemsCreateContext";

interface ITeacherCoursesItemsCreatePageProps {
  isLogged: boolean;
}

const TeacherCoursesItemsCreate = ({
  isLogged,
}: ITeacherCoursesItemsCreatePageProps) => {
  return (
    <CoursesItemsCreateProvider>
      <Head>
        <title>Crear clase - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <CoursesItemsCreateIndex />
      </TeacherLayout>
    </CoursesItemsCreateProvider>
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

export default TeacherCoursesItemsCreate;
