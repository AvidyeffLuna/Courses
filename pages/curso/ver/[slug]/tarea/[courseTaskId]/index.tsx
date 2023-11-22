import CoursesWorkProvider from "application/context/Courses/CoursesWork/CoursesWorkContext";
import type { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import CoursesWorkHead from "presentation/components/Courses/CoursesWork/CoursesWorkHead/CoursesWorkHead";
import CoursesWorkIndex from "presentation/components/Courses/CoursesWork/CoursesWorkIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";

interface ICoursesWorkProps {
  isLogged: boolean;
}

const CoursesWork = ({ isLogged }: ICoursesWorkProps) => {
  return (
    <CoursesWorkProvider>
      <CoursesWorkHead />

      <AppLayout isLogged={isLogged}>
        <CoursesWorkIndex />
      </AppLayout>
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
