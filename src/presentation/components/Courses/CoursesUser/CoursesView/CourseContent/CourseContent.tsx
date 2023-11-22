/* eslint-disable react-hooks/exhaustive-deps */
import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesUser/CoursesView/CoursesViewContext";
import { ICourseLesson } from "domain/core/entities/courseEntity";
import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { CoursesUserRoutesEnum } from "presentation/routes/coursesRoutes";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Lesson from "./Lesson/Lesson";

interface ICourseContentProps {
  course: IGetCourseUserByIdResponse;
}

export default function CourseContent({ course }: ICourseContentProps) {
  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseLessons } = actions;
  const { data, loading, sucessful, error } = state.lessons;

  const router = useRouter();

  const [lessons, setLessons] = useState<ICourseLesson[]>([]);

  const getCourseLessonsDispatch = useCallback(() => {
    getCourseLessons({
      courseId: course.data.courseId,
    })(dispatch);
  }, [course.data.courseId, dispatch, getCourseLessons]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getCourseLessonsDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseLessonsDispatch]);

  useEffect(() => {
    if (sucessful) {
      setLessons(data);

      if ((!router.query?.lesson || !router.query?.lecture) && data.length > 0)
        router.push({
          pathname: CoursesUserRoutesEnum.CoursesView,
          query: {
            slug: course.data.course?.slug,
            lesson: data[0].courseLessonId,
            lecture:
              data[0].itemsList && data[0].itemsList.length > 0
                ? data[0].itemsList[0].courseItemId
                : "",
          },
        });
    }
  }, [data, sucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getCourseLessonsDispatch} />;

  if (lessons.length === 0 && sucessful) {
    return (
      <ErrorMessage
        title="No se ha encontrado el contenido del curso"
        description="No hemos el contenido del curso"
        retry={getCourseLessonsDispatch}
      />
    );
  }

  return (
    <Row>
      {lessons.map((lesson: ICourseLesson, i) => (
        <Col key={lesson.courseLessonId} lg={12} className="px-0">
          <Lesson lesson={lesson} index={i + 1} />
        </Col>
      ))}
    </Row>
  );
}
