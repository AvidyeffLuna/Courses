import { Col, Row } from "react-bootstrap";

interface ICourseTaskTitleProps {
  title: string;
  index: number;
}

export default function CourseTaskTitle({
  title,
  index,
}: ICourseTaskTitleProps) {
  return (
    <Row>
      <Col lg={12}>
        <h4>
          {index}. {title}
        </h4>
      </Col>
    </Row>
  );
}
