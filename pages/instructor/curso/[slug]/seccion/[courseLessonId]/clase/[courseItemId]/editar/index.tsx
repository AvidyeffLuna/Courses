import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";
import nookies from "nookies";
import CoursesItemsEditIndex from "presentation/components/Teacher/Courses/CoursesItems/CoursesItemsEdit/CoursesItemsEditIndex";
import CoursesItemsEditProvider from "application/context/Teacher/Courses/CousesItems/CoursesItemsEdit/CoursesItemsEditContext";

interface ITeacherCoursesItemsEditPageProps {
  isLogged: boolean;
}

const TeacherCoursesItemsEdit = ({
  isLogged,
}: ITeacherCoursesItemsEditPageProps) => {
  return (
    <CoursesItemsEditProvider>
      <Head>
        <title>Modificar clase - {process.env.appName}</title>
      </Head>

      <TeacherLayout isLogged={isLogged}>
        <CoursesItemsEditIndex />
      </TeacherLayout>
    </CoursesItemsEditProvider>
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

export default TeacherCoursesItemsEdit;
