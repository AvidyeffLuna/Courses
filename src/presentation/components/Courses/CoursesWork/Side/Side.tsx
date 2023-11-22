import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Courses/CoursesWork/CoursesWorkContext";
import { ICourseUserTask } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import DeliverableAdd from "./DeliverableAdd/DeliverableAdd";
import DeliverableView from "./DeliverableView/DeliverableView";

export default function Side() {
  const { state } = useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { data: course } = state.courseState;

  const router = useRouter();

  const getTaskIsCompleted = (): boolean => {
    if (course.tasks.length > 0) {
      const task: ICourseUserTask | undefined = course.tasks.find(
        (task) => task.taskId === router.query.courseTaskId
      );

      if (task) return task.isCompleted;
    }

    return false;
  };

  const getDeliverableComponent = () => {
    if (router.query?.deliverable) return <DeliverableView />;

    if (!getTaskIsCompleted()) return <DeliverableAdd />;

    return <div />;
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Row className="py-5 px-5">
        <Col lg={12}>{getDeliverableComponent()}</Col>
      </Row>
    </div>
  );
}
