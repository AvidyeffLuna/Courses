import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";
import { ICourseUserTask } from "domain/core/entities/courseEntity";
import { IDeliverable } from "domain/core/entities/deliverableEntity";
import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddDeliverableButton from "./AddDeliverableButton/AddDeliverableButton";
import DeliverableCard from "./DeliverableCard/DeliverableCard";
import FinishTaskButton from "./FinishTaskButton/FinishTaskButton";

export default function TimeLineList() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: teacher } = authState.teacher;

  const { state, actions, dispatch } =
    useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { getDeliverables } = actions;
  const { data: course } = state.courseState;
  const { data, loading, sucessful, error, limit } = state.deliverablesState;
  const { sucessful: createDeliverableSucessful } =
    state.createDeliverableState;

  const router = useRouter();

  const [deliverables, setDeliverables] = useState<IDeliverable[]>([]);

  const getDeliverablesDispatch = useCallback(() => {
    getDeliverables({
      courseId: course.courseId,
      courseTaskId: router.query.courseTaskId
        ? router.query.courseTaskId.toString()
        : "",
      userId: router.query.userId ? router.query.userId.toString() : "",
      teacherId: teacher?.teacherId,
      limit,
    })(dispatch);
  }, [
    getDeliverables,
    course.courseId,
    router.query.courseTaskId,
    router.query.userId,
    teacher?.teacherId,
    limit,
    dispatch,
  ]);

  const getTaskIsCompleted = (): boolean => {
    if (course.tasks.length > 0) {
      const task: ICourseUserTask | undefined = course.tasks.find(
        (task) => task.taskId === router.query.courseTaskId
      );

      if (task) return task.isCompleted;
    }

    return false;
  };

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup && teacher) getDeliverablesDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getDeliverablesDispatch, teacher]);

  useEffect(() => {
    if (sucessful) setDeliverables(data);
  }, [data, sucessful]);

  useEffect(() => {
    if (createDeliverableSucessful) getDeliverablesDispatch();
  }, [createDeliverableSucessful, getDeliverablesDispatch]);

  if (loading && deliverables.length === 0) return <Loading />;

  if (error) return <ErrorMessage retry={getDeliverablesDispatch} />;

  return (
    <Row>
      {deliverables.length > 0 &&
        deliverables.map((deliverable: IDeliverable) => (
          <Col key={deliverable.deliverableId} lg={12} className="mb-5">
            <DeliverableCard
              deliverable={deliverable}
              isSelected={
                router.query?.deliverable === deliverable.deliverableId
                  ? true
                  : false
              }
            />
          </Col>
        ))}

      {!getTaskIsCompleted() && (
        <Col lg={deliverables.length === 0 ? 12 : 3} className="text-center">
          <AddDeliverableButton />
        </Col>
      )}

      {!getTaskIsCompleted() && deliverables.length > 0 && (
        <Col lg={9} className="text-center">
          <FinishTaskButton />
        </Col>
      )}
    </Row>
  );
}
