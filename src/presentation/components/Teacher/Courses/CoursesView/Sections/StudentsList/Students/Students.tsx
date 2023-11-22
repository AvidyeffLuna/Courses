import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { ICourseUser } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import StudentCard from "presentation/components/common/Students/StudentCard/StudentCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Students() {
  const router = useRouter();

  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getCourseUsers } = actions;
  const { data: course } = state.course;
  const { data, loading, sucessful, error, limit, total } = state.courseUsers;

  const [students, setStudents] = useState<ICourseUser[]>([]);

  const getCourseUsersDispatch = useCallback(() => {
    getCourseUsers({
      courseId: course.courseId,
      limit,
    })(dispatch);
  }, [course.courseId, dispatch, getCourseUsers, limit]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getCourseUsersDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCourseUsersDispatch]);

  const handleCoursesSucessful = useCallback(() => {
    setStudents(data);
  }, [data]);

  useEffect(() => {
    if (sucessful) handleCoursesSucessful();
  }, [data, sucessful, handleCoursesSucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getCourseUsersDispatch} />;

  if (students.length === 0 && !sucessful) return <div />;

  if (students.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado estudiantes"
        description="El curso no posee estudiantes actualmente"
        retry={getCourseUsersDispatch}
      />
    );
  }

  return (
    <Row>
      {students.map((student: ICourseUser) => (
        <Col key={student.userId} lg={4} className="mb-5">
          <StudentCard student={student} />
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
