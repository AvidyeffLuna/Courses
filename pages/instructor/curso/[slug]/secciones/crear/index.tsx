import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import CoursesLessonsCreateIndex from "presentation/components/Teacher/Courses/CoursesLessons/CoursesLessonsCreate/CoursesLessonsCreateIndex";
import CoursesLessonsCreateProvider from "application/context/Teacher/Courses/CousesLessons/CoursesLessonsCreate/CoursesLessonsCreateContext";

interface ITeacherCoursesLessonsCreatePageProps {
  isLogged: boolean;
}

const TeacherCoursesLessonsCreate = ({
  isLogged,
}: ITeacherCoursesLessonsCreatePageProps) => {
  return (
    <CoursesLessonsCreateProvider>
      <Head>
        <title>Crear sección - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <CoursesLessonsCreateIndex />
      </TeacherLayout>
    </CoursesLessonsCreateProvider>
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

export default TeacherCoursesLessonsCreate;
