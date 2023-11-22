import CoursesWorkProvider from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import type { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import CoursesWorkHead from "presentation/components/Teacher/Courses/CoursesWork/CoursesWorkHead/CoursesWorkHead";
import CoursesWorkIndex from "presentation/components/Teacher/Courses/CoursesWork/CoursesWorkIndex";
import TeacherLayout from "presentation/layouts/TeacherLayout/TeacherLayout";

interface ICoursesWorkProps {
  isLogged: boolean;
}

const CoursesWork = ({ isLogged }: ICoursesWorkProps) => {
  return (
    <CoursesWorkProvider>
      <CoursesWorkHead />

      <TeacherLayout isLogged={isLogged}>
        <CoursesWorkIndex />
      </TeacherLayout>
    </CoursesWorkProvider>
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

export default CoursesWork;
