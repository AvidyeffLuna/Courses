import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { ICourseTask } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import CourseTaskCard from "presentation/components/common/Courses/CourseTaskCard/CourseTaskCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Students() {
  const router = useRouter();

  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseTasks } = actions;
  const { data: course } = state.course;
  const { data, loading, sucessful, error, limit, total } = state.courseTasks;

  const [tasks, setStudents] = useState<ICourseTask[]>([]);

  const getCourseTasksDispatch = useCallback(() => {
    getCourseTasks({
      courseId: course.courseId,
      page: router.query?.page ? parseInt(router.query.page.toString()) : 1,
      limit,
    })(dispatch);
  }, [course.courseId, dispatch, getCourseTasks, limit, router.query.page]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getCourseTasksDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseTasksDispatch]);

  const handleCoursesSucessful = useCallback(() => {
    setStudents(data);
  }, [data]);

  useEffect(() => {
    if (sucessful) handleCoursesSucessful();
  }, [data, sucessful, handleCoursesSucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getCourseTasksDispatch} />;

  if (tasks.length === 0 && !sucessful) return <div />;

  if (tasks.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado tareas"
        description="El curso no posee tareas actualmente"
        retry={getCourseTasksDispatch}
      />
    );
  }

  return (
    <Row>
      {tasks.map((courseTask: ICourseTask, i: number) => (
        <Col key={courseTask.courseTaskId} lg={12} className="mb-5">
          <CourseTaskCard
            task={courseTask}
            index={i + 1}
            isCompletedShow={false}
          />
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
