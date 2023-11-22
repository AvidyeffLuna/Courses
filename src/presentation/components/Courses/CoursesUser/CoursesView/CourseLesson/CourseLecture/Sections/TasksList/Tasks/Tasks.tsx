import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesUser/CoursesView/CoursesViewContext";
import {
  ICourseTask,
  ICourseUserTask,
} from "domain/core/entities/courseEntity";
import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import CourseTaskCard from "presentation/components/common/Courses/CourseTaskCard/CourseTaskCard";
import { CoursesWorkRoutesEnum } from "presentation/routes/coursesRoutes";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Url } from "url";

interface ITasksProps {
  course: IGetCourseUserByIdResponse;
}

export default function Tasks({ course }: ITasksProps) {
  const router = useRouter();

  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseTasks } = actions;
  const { data, loading, sucessful, error, limit, total } = state.courseTasks;

  const [tasks, setStudents] = useState<ICourseTask[]>([]);

  const getCourseTasksDispatch = useCallback(() => {
    getCourseTasks({
      courseId: course.data.courseId,
      page: router.query?.page ? parseInt(router.query.page.toString()) : 1,
      limit,
    })(dispatch);
  }, [
    course.data.courseId,
    dispatch,
    getCourseTasks,
    limit,
    router.query.page,
  ]);

  const getDoTask = (taskId: string, i: number): boolean => {
    if (course.data.tasks.length > 0) {
      const task: ICourseUserTask | undefined = course.data.tasks.find(
        (courseTask) => courseTask.taskId === taskId
      );

      if (task && task.isCompleted) return false;

      if (task && i === 0 && !task.isCompleted) return true;

      if (course.data.tasks[i - 1] && !course.data.tasks[i - 1].isCompleted)
        return false;
    }

    return true;
  };

  const getTaskIsCompleted = (taskId: string): boolean => {
    if (course.data.tasks.length > 0) {
      const task: ICourseUserTask | undefined = course.data.tasks.find(
        (courseTask) => courseTask.taskId === taskId
      );

      if (task) return task.isCompleted;
    }

    return false;
  };

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
            doTask={getDoTask(courseTask.courseTaskId, i)}
            isCompleted={getTaskIsCompleted(courseTask.courseTaskId)}
            href={
              {
                pathname: CoursesWorkRoutesEnum.CoursesWork,
                query: {
                  slug: course.data.course?.slug,
                  courseTaskId: courseTask.courseTaskId,
                },
              } as unknown as Url
            }
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
