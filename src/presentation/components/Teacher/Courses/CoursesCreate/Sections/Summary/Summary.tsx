import {
  CoursesCreateContext,
  ICoursesCreateContext,
} from "application/context/Teacher/Courses/CoursesCreate/CoursesCreateContext";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Options from "./Options/Options";
import CourseDetail from "./CourseDetail/CourseDetail";
import SuccesfulMessage from "./SuccesfulMessage/SuccesfulMessage";

export default function Summary() {
  const { state, actions, dispatch } =
    useContext<ICoursesCreateContext>(CoursesCreateContext);
  const { getCourseById } = actions;
  const { data: course, loading, sucessful, error } = state.course;

  const router = useRouter();

  const getCourseByIdDispatch = useCallback(() => {
    getCourseById({ courseId: router.query.courseId ?? "" })(dispatch);
  }, [dispatch, getCourseById, router.query.courseId]);

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
          title="No se ha podido generar el resumen"
          description="No hemos podido generar el resumen de tu curso. Vuelve a intentarlo"
          retry={getCourseByIdDispatch}
        />
      </div>
    );
  }

  if (!course.courseId && !sucessful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <Row className="mt-5">
      <Col lg={12} className="d-flex text-center justify-content-center mb-5">
        <SuccesfulMessage />
      </Col>

      <Col lg={12}>
        <CourseDetail />
      </Col>

      <Col lg={12} className="mb-5">
        <Options />
      </Col>
    </Row>
  );
}
