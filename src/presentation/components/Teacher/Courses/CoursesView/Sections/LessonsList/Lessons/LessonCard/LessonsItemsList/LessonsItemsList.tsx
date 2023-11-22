import { Col, Row } from "react-bootstrap";
import CreateLessonItemButton from "./CreateLessonItemButton/CreateLessonItemButton";
import LessonItems from "./LessonItems/LessonItems";

interface ILessonsItemsListProps {
  courseId: string;
  courseLessonId: string;
}

export default function LessonsItemsList({
  courseId,
  courseLessonId,
}: ILessonsItemsListProps) {
  return (
    <Row className="align-items-center">
      <Col lg={6} className="mb-5">
        <h4>Clases de la sección</h4>
      </Col>

      <Col lg={6} className="text-end mb-5">
        <CreateLessonItemButton courseLessonId={courseLessonId} />
      </Col>

      <Col lg={12}>
        <LessonItems courseId={courseId} courseLessonId={courseLessonId} />
      </Col>
    </Row>
  );
}
