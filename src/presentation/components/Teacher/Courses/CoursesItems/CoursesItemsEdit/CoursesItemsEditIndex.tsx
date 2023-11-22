import {
  CoursesItemsEditContext,
  ICoursesItemsEditContext,
} from "application/context/Teacher/Courses/CousesItems/CoursesItemsEdit/CoursesItemsEditContext";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CourseItemFormulary from "./CourseItemFormulary/CourseItemFormulary";

export default function CoursesItemsEditIndex() {
  const { state, actions, dispatch } = useContext<ICoursesItemsEditContext>(
    CoursesItemsEditContext
  );
  const { getCourseItemById } = actions;
  const { data: courseItem, loading, sucessful, error } = state.courseItem;

  const router = useRouter();

  const getCourseItemByIdDispatch = useCallback(() => {
    getCourseItemById({
      courseLessonId: router.query.courseLessonId,
      courseItemId: router.query.courseItemId,
    })(dispatch);
  }, [
    dispatch,
    getCourseItemById,
    router.query.courseItemId,
    router.query.courseLessonId,
  ]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getCourseItemByIdDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseItemByIdDispatch]);

  if (loading)
    return (
      <div style={{ height: "80vh" }}>
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorMessage retry={getCourseItemByIdDispatch} />
      </div>
    );

  if (!courseItem.courseItemId && sucessful) {
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorEmptyMessage
          title="No se ha encontrado la clase"
          description="No hemos podido encontrar la clase, puede que haya sido eliminado"
          retry={getCourseItemByIdDispatch}
        />
      </div>
    );
  }

  if (!courseItem.courseItemId && !sucessful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Modificar clase</h3>
        </Col>

        <Col lg={12}>
          <CourseItemFormulary />
        </Col>
      </Row>
    </div>
  );
}
