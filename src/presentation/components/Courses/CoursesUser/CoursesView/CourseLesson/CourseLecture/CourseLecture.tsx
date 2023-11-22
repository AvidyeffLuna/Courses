import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesUser/CoursesView/CoursesViewContext";
import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CourseVideo from "./CourseVideo/CourseVideo";
import Sections from "./Sections/Sections";

interface ICourseLectureProps {
  course: IGetCourseUserByIdResponse;
}

export default function CourseLecture({ course }: ICourseLectureProps) {
  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseItemById } = actions;
  const { data: lesson } = state.lesson;
  const { data: item, loading, sucessful, error } = state.item;

  const router = useRouter();

  const getCourseItemByIdDispatch = useCallback(() => {
    getCourseItemById({
      courseId: lesson.courseId,
      courseLessonId: lesson.courseLessonId,
      courseItemId: router.query.lecture ?? "",
    })(dispatch);
  }, [
    dispatch,
    getCourseItemById,
    lesson.courseId,
    lesson.courseLessonId,
    router.query.lecture,
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

  if (!item.courseItemId && sucessful) {
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorMessage
          title="No se ha encontrado la clase"
          description="No hemos podido encontrar la clase, puede que haya sido eliminado"
          retry={getCourseItemByIdDispatch}
        />
      </div>
    );
  }

  if (!item.courseItemId && !sucessful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <Row>
      {item.mainVideoUrl.length > 0 && (
        <Col lg={12} className="px-0">
          <CourseVideo />
        </Col>
      )}

      <Col lg={12} className="px-5 py-5">
        <Sections course={course} />
      </Col>
    </Row>
  );
}
