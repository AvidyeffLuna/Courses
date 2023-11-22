import { ICourseItem, ICourseLesson } from "domain/core/entities/courseEntity";
import { Col, Row } from "react-bootstrap";
import Lecture from "./Lecture/Lecture";

interface ILecturesProps {
  lesson: ICourseLesson;
}

export default function Lectures({ lesson }: ILecturesProps) {
  if (!lesson.itemsList || lesson.itemsList.length === 0) return <div />;

  return (
    <Row className="px-0">
      {lesson.itemsList.map((item: ICourseItem, i) => (
        <Col key={item.courseItemId} lg={12} className="px-0">
          <Lecture lecture={item} index={i + 1} />
        </Col>
      ))}
    </Row>
  );
}
