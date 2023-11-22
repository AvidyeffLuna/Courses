import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Side from "./Side/Side";
import Timeline from "./Timeline/Timeline";

export default function CourseWorkIndex() {
  const { state, actions, dispatch } =
    useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { getCourseById } = actions;
  const { data: course, loading, sucessful, error } = state.courseState;

  const router = useRouter();

  const getCourseByIdDispatch = useCallback(() => {
    getCourseById({
      courseId: router.query.slug ?? "",
      userId: router.query.userId ?? "",
    })(dispatch);
  }, [dispatch, getCourseById, router.query.slug, router.query.userId]);

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
      <Row style={{ position: "relative" }} className="py-5">
        <Col lg={12} className="px-5">
          <div>
            <h3>{course.course?.name}</h3>
          </div>

          <div>
            <p>Entregables de la tarea del estudiante y respuestas</p>
          </div>
        </Col>

        <Col lg={12}>
          <div className="d-flex">
            <Timeline />

            <Side />
          </div>
        </Col>

        <Col lg={7}></Col>
      </Row>
    </div>
  );
}
