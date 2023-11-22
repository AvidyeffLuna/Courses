import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import CoursesViewIndex from "presentation/components/Teacher/Courses/CoursesView/CoursesViewIndex";
import CoursesViewProvider from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";

interface ITeacherCoursesViewPageProps {
  isLogged: boolean;
}

const TeacherCoursesView = ({ isLogged }: ITeacherCoursesViewPageProps) => {
  return (
    <CoursesViewProvider>
      <Head>
        <title>Tus cursos - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <CoursesViewIndex />
      </TeacherLayout>
    </CoursesViewProvider>
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

export default TeacherCoursesView;
