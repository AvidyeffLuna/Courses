import {
  CoursesTasksCreateContext,
  ICoursesTasksCreateContext,
} from "application/context/Teacher/Courses/CoursesTasks/CoursesTasksCreate/CoursesTasksCreateContext";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CourseTaskFormulary from "./CourseTaskFormulary/CourseTaskFormulary";

export default function CoursesTasksCreateIndex() {
  const { state, actions, dispatch } = useContext<ICoursesTasksCreateContext>(
    CoursesTasksCreateContext
  );
  const { getCourseById } = actions;
  const { data: course, loading, sucessful, error } = state.course;

  const router = useRouter();

  const getCourseByIdDispatch = useCallback(() => {
    getCourseById({ courseId: router.query.slug ?? "" })(dispatch);
  }, [dispatch, getCourseById, router.query.slug]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getCourseByIdDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseByIdDispatch]);

  if (loading)
    return (
      <div style={{ height: "80vh" }}>
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorMessage retry={getCourseByIdDispatch} />
      </div>
    );

  if (!course.courseId && sucessful) {
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorEmptyMessage
          title="No se ha encontrado el curso"
          description="No hemos podido encontrar el curso, puede que haya sido eliminado"
          retry={getCourseByIdDispatch}
        />
      </div>
    );
  }

  if (!course.courseId && !sucessful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Crear tarea</h3>
        </Col>

        <Col lg={12}>
          <CourseTaskFormulary />
        </Col>
      </Row>
    </div>
  );
}
