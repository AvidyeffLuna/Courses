import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesUser/CoursesView/CoursesViewContext";
import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import CourseLecture from "./CourseLecture/CourseLecture";

interface ICourseLessonProps {
  course: IGetCourseUserByIdResponse;
}

export default function CourseLesson({ course }: ICourseLessonProps) {
  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseLessonById } = actions;
  const { data: lesson, loading, sucessful, error } = state.lesson;

  const router = useRouter();

  const getCourseLessonByIdDispatch = useCallback(() => {
    getCourseLessonById({
      courseId: course.data.courseId,
      courseLessonId: router.query.lesson ?? "",
    })(dispatch);
  }, [
    course.data.courseId,
    dispatch,
    getCourseLessonById,
    router.query.lesson,
  ]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup && router.query?.lesson) getCourseLessonByIdDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseLessonByIdDispatch, router.query?.lesson]);

  if (loading)
    return (
      <div style={{ height: "80vh" }}>
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorMessage retry={getCourseLessonByIdDispatch} />
      </div>
    );

  if (!lesson.courseLessonId && sucessful) {
    return (
      <div className="mt-5" style={{ height: "80vh" }}>
        <ErrorMessage
          title="No se ha encontrado la clase"
          description="No hemos podido encontrar la clase, puede que haya sido eliminado"
          retry={getCourseLessonByIdDispatch}
        />
      </div>
    );
  }

  if (!lesson.courseLessonId && !sucessful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return <CourseLecture course={course} />;
}
