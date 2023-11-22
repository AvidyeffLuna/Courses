import { ICourseTask } from "domain/core/entities/courseEntity";
import { Card, Col, Row } from "react-bootstrap";
import { Url } from "url";
import CourseTaskDescription from "./CourseTaskDescription/CourseTaskDescription";
import CourseTaskIsCompleted from "./CourseTaskIsCompleted/CourseTaskIsCompleted";
import CourseTaskOptions from "./CourseTaskOptions/CourseTaskOptions";
import CourseTaskTitle from "./CourseTaskTitle/CourseTaskTitle";

interface ICourseTaskCardProps {
  task: ICourseTask;
  index: number;
  href?: Url | null;
  doTask?: boolean;
  isCompleted?: boolean;
  isCompletedShow?: boolean;
}

export default function CourseTaskCard({
  task,
  index,
  href,
  doTask = false,
  isCompleted = false,
  isCompletedShow = true,
}: ICourseTaskCardProps) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12} className="mb-2">
            <CourseTaskTitle title={task.title} index={index} />
          </Col>

          <Col lg={12}>
            <CourseTaskDescription description={task.description} />
          </Col>

          {isCompletedShow && (
            <Col lg={12} className="mb-4">
              <CourseTaskIsCompleted isCompleted={isCompleted} />
            </Col>
          )}

          <Col lg={12}>
            <CourseTaskOptions
              mediaList={task.mediaList}
              href={href}
              doTask={doTask}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
