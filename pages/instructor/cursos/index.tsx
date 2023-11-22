import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import CoursesListIndex from "presentation/components/Teacher/Courses/CoursesList/CoursesListIndex";
import CoursesListProvider from "application/context/Teacher/Courses/CoursesList/CoursesListContext";

interface ITeacherCoursesListPageProps {
  isLogged: boolean;
}

const TeacherCoursesList = ({ isLogged }: ITeacherCoursesListPageProps) => {
  return (
    <CoursesListProvider>
      <Head>
        <title>Tus cursos - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <CoursesListIndex />
      </TeacherLayout>
    </CoursesListProvider>
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

export default TeacherCoursesList;
