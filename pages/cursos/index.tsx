import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import CoursesListIndex from "presentation/components/Courses/CoursesList/CoursesListIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import CourseUseCases from "domain/useCases/course/courseUseCases";
import { IGetCoursesResponse } from "domain/core/response/course/courseResponsesEntities";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";

interface ICoursesListPageProps {
  isLogged: boolean;
  courses: IGetCoursesResponse | ICourseFailure;
}

const CoursesList = ({ isLogged, courses }: ICoursesListPageProps) => {
  return (
    <>
      <Head>
        <title>{process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <CoursesListIndex courses={courses} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const skip: number | null =
      ctx.query?.page && 20
        ? getSkipPagination({
            page: parseInt(ctx.query.page.toString()),
            limit: 20,
          })
        : null;

    const courses = await new CourseUseCases().getCourses({
      userId: cookies?.userId ?? null,
      sort: { totalRatings: -1 },
      searchQuery: ctx.query?.search_query
        ? ctx.query.search_query.toString()
        : null,
      limit: 20,
      skip: skip,
      minLessons: 1,
      maxInitCourseDate: new Date(),
    });

    return {
      props: {
        isLogged: cookies?.token?.length > 0,
        courses,
      },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default CoursesList;
