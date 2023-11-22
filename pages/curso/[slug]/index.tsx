import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import CoursesViewIndex from "presentation/components/Courses/CoursesView/CoursesViewIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCourseByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import CoursesViewProvider from "application/context/Courses/CoursesView/CoursesViewContext";

interface ICoursesViewPageProps {
  isLogged: boolean;
  course: IGetCourseByIdResponse | ICourseFailure;
}

const CoursesView = ({ isLogged, course }: ICoursesViewPageProps) => {
  return (
    <CoursesViewProvider>
      <Head>
        <title>
          {"code" in course ? "" : `${course.data.name} - `}
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

    const course = await new CourseUseCases().getCourseById({
      courseId: ctx.params?.slug ? ctx.params.slug.toString() : "",
      userId: cookies.userId,
    });

    if (course.data.isBuying) {
      return {
        redirect: {
          permanent: false,
          destination: `/curso/ver/${course.data.slug}`,
        },
        props: {},
      };
    }

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
