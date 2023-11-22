import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import CoursesCreateIndex from "presentation/components/Teacher/Courses/CoursesCreate/CoursesCreateIndex";
import CoursesCreateProvider from "application/context/Teacher/Courses/CoursesCreate/CoursesCreateContext";

interface ITeacherCoursesCreatePageProps {
  isLogged: boolean;
}

const TeacherCoursesCreate = ({ isLogged }: ITeacherCoursesCreatePageProps) => {
  return (
    <CoursesCreateProvider>
      <Head>
        <title>Crear curso - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <CoursesCreateIndex />
      </TeacherLayout>
    </CoursesCreateProvider>
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

export default TeacherCoursesCreate;
