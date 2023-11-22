import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { ICourseLesson } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import LessonCard from "./LessonCard/LessonCard";

export default function Lessons() {
  const router = useRouter();

  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseLessons } = actions;
  const { data: course } = state.course;
  const { data, loading, sucessful, error } = state.courseLessons;

  const [courseLessons, setCourseLessons] = useState<ICourseLesson[]>([]);

  const getCourseLessonsDispatch = useCallback(() => {
    getCourseLessons({
      courseId: course?.courseId,
      searchQuery: router.query?.search_query,
    })(dispatch);
  }, [
    course?.courseId,
    dispatch,
    getCourseLessons,
    router.query?.search_query,
  ]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getCourseLessonsDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseLessonsDispatch]);

  const handleCourseLessonsSucessful = useCallback(() => {
    setCourseLessons(data);
  }, [data]);

  useEffect(() => {
    if (sucessful) handleCourseLessonsSucessful();
  }, [data, sucessful, handleCourseLessonsSucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getCourseLessonsDispatch} />;

  if (courseLessons.length === 0 && !sucessful) return <div />;

  if (courseLessons.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado secciones"
        description="No has creado secciones en este momento"
        retry={getCourseLessonsDispatch}
      />
    );
  }

  return (
    <Row>
      {courseLessons.map((courseLesson, i) => (
        <Col key={courseLesson.courseLessonId} lg={12} className="mb-4">
          <LessonCard courseLesson={courseLesson} index={i + 1} />
        </Col>
      ))}
    </Row>
  );
}
