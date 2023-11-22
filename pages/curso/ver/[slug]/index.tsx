import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import CoursesViewIndex from "presentation/components/Courses/CoursesUser/CoursesView/CoursesViewIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import CoursesViewProvider from "application/context/Courses/CoursesUser/CoursesView/CoursesViewContext";
import CourseUsersUseCases from "domain/useCases/course/courseUsersUseCases";
import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";

interface ICoursesViewPageProps {
  isLogged: boolean;
  course: IGetCourseUserByIdResponse | ICourseFailure;
}

const CoursesView = ({ isLogged, course }: ICoursesViewPageProps) => {
  return (
    <CoursesViewProvider>
      <Head>
        <title>
          {"code" in course ? "" : `${course.data.course?.name} - `}
          {process.env.appName}
        </title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <CoursesViewIndex course={course} />
      </AppLayout>
    </CoursesViewProvider>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const course = await new CourseUsersUseCases().getCourseUserById({
      courseId: ctx.params?.slug ? ctx.params.slug.toString() : "",
      userId: cookies.userId,
    });

    return {
      props: {
        isLogged: cookies?.token?.length > 0,
        course,
      },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default CoursesView;
