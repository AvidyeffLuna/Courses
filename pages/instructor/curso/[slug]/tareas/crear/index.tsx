import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import CoursesTasksCreateIndex from "presentation/components/Teacher/Courses/CoursesTasks/CoursesTasksCreate/CoursesTasksCreateIndex";
import CoursesTasksCreateProvider from "application/context/Teacher/Courses/CoursesTasks/CoursesTasksCreate/CoursesTasksCreateContext";

interface ITeacherCoursesTasksCreatePageProps {
  isLogged: boolean;
}

const TeacherCoursesTasksCreate = ({
  isLogged,
}: ITeacherCoursesTasksCreatePageProps) => {
  return (
    <CoursesTasksCreateProvider>
      <Head>
        <title>Crear tarea - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <CoursesTasksCreateIndex />
      </TeacherLayout>
    </CoursesTasksCreateProvider>
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

export default TeacherCoursesTasksCreate;
