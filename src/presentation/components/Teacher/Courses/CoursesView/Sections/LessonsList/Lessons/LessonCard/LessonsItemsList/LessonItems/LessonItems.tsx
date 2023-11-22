import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { ICourseItem } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import LessonItem from "./LessonItem/LessonItem";

interface ILessonItemsProps {
  courseId: string;
  courseLessonId: string;
}

export default function LessonItems({
  courseId,
  courseLessonId,
}: ILessonItemsProps) {
  const router = useRouter();

  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseItems } = actions;
  const { data, loading, sucessful, error } = state.courseItems;

  const [courseItems, setCourseItems] = useState<ICourseItem[]>([]);

  const getCourseItemsDispatch = useCallback(() => {
    getCourseItems({
      courseId: courseId,
      courseLessonId: courseLessonId,
      searchQuery: router.query?.search_query,
    })(dispatch);
  }, [
    courseId,
    courseLessonId,
    dispatch,
    getCourseItems,
    router.query?.search_query,
  ]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getCourseItemsDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseItemsDispatch]);

  const handleCourseItemsSucessful = useCallback(() => {
    setCourseItems(data);
  }, [data]);

  useEffect(() => {
    if (sucessful) handleCourseItemsSucessful();
  }, [data, sucessful, handleCourseItemsSucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getCourseItemsDispatch} />;

  if (courseItems.length === 0 && !sucessful) return <div />;

  if (courseItems.length === 0) {
    return <p>No has creado ninguna clase a esta sección</p>;
  }

  return (
    <Row>
      {courseItems.map((courseItem: ICourseItem, i) => (
        <Col key={courseItem.courseItemId} lg={12} className="mb-4">
          <LessonItem courseItem={courseItem} index={i + 1} />
        </Col>
      ))}
    </Row>
  );
}
