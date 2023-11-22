import Head from "next/head";
import CoursesFavouritesIndex from "presentation/components/Courses/CoursesFavourites/CoursesFavouritesIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import { IGetCoursesResponse } from "domain/core/response/course/courseResponsesEntities";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import CourseUseCases from "domain/useCases/course/courseUseCases";

interface ICoursesFavouritesPageProps {
  isLogged: boolean;
  courses: IGetCoursesResponse | ICourseFailure;
}

const CoursesFavourites = ({
  isLogged,
  courses,
}: ICoursesFavouritesPageProps) => {
  return (
    <>
      <Head>
        <title>Lista de deseos - {process.env.appName}</title>
      </Head>

      <AppLayout isLogged={isLogged}>
        <CoursesFavouritesIndex courses={courses} />
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

    const courses = await new CourseUseCases().getCoursesWhiteList({
      userId: cookies?.userId ?? null,
      limit: 20,
      skip: skip,
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

export default CoursesFavourites;
