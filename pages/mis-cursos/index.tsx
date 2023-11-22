import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import CoursesListIndex from "presentation/components/Courses/CoursesUser/CoursesList/CoursesListIndex";
import AppLayout from "presentation/layouts/AppLayout/AppLayout";
import nookies from "nookies";
import { IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { getSkipPagination } from "presentation/utils/pagination/paginationUtils";
import CourseUsersUseCases from "domain/useCases/course/courseUsersUseCases";

interface ICoursesUserListPageProps {
  isLogged: boolean;
  courses: IGetCoursesUsersResponse | ICourseFailure;
}

const CoursesUserList = ({ isLogged, courses }: ICoursesUserListPageProps) => {
  return (
    <>
      <Head>
        <title>Mis cursos - {process.env.appName}</title>
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
      ctx.params?.page && 20
        ? getSkipPagination({
            page: parseInt(ctx.params.page.toString()),
            limit: 20,
          })
        : null;

    const courses = await new CourseUsersUseCases().getCoursesUsers({
      userId: cookies?.userId ?? "",
      limit: 20,
      skip: skip,
    });

    return {
      props: {
        isLogged: cookies?.token?.length > 0,
        courses: JSON.parse(JSON.stringify(courses)),
      },
    };
  } catch (err) {
    return { props: { isLogged: false } };
  }
};

export default CoursesUserList;
