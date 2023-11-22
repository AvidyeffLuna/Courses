import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import {
  CoursesListContext,
  ICoursesListContext,
} from "application/context/Teacher/Courses/CoursesList/CoursesListContext";
import { ICourse } from "domain/core/entities/courseEntity";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import TeacherCourseCard from "presentation/components/common/Courses/TeacherCourseCard/TeacherCourseCard";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Courses() {
  const router = useRouter();

  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: teacher } = authState.teacher;

  const { state, actions, dispatch } =
    useContext<ICoursesListContext>(CoursesListContext);
  const { getCourses } = actions;
  const { data, loading, sucessful, error, limit, total } = state.courses;

  const [courses, setCourses] = useState<ICourse[]>([]);

  const getCoursesDispatch = useCallback(() => {
    getCourses({
      teacherId: teacher?.teacherId,
      searchQuery: router.query?.searchQuery,
      minProjectPrice:
        router.query.min_price && router.query.min_price.length > 0
          ? { $gte: parseFloat(router.query.min_price.toString()) }
          : null,
      maxProjectPrice:
        router.query.max_price && router.query.max_price.length > 0
          ? { $lte: parseFloat(router.query.max_price.toString()) }
          : null,
      page: router.query.page
        ? parseInt(router.query.page.toString(), 10)
        : null,
      limit,
    })(dispatch);
  }, [dispatch, getCourses, limit, router.query, teacher]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup && teacher) getCoursesDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCoursesDispatch, teacher]);

  const handleCoursesSucessful = useCallback(() => {
    setCourses(data);
  }, [data]);

  useEffect(() => {
    if (sucessful) handleCoursesSucessful();
  }, [data, sucessful, handleCoursesSucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getCoursesDispatch} />;

  if (courses.length === 0 && !sucessful) return <div />;

  if (courses.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado cursos"
        description="No has creado cursos en este momento"
        retry={getCoursesDispatch}
      />
    );
  }

  return (
    <Row>
      {courses.map((course) => (
        <Col key={course.courseId} lg={12} className="mb-5">
          <Link
            href={{
              pathname: TeacherCoursesRoutesEnum.CoursesView,
              query: { slug: course.slug },
            }}
          >
            <a>
              <TeacherCourseCard course={course} />
            </a>
          </Link>
        </Col>
      ))}

      <Col lg={12} className="d-flex justify-content-end">
        <Paginate
          page={router.query?.page ? router.query.page.toString() : "1"}
          limit={limit}
          total={total}
        />
      </Col>
    </Row>
  );
}
