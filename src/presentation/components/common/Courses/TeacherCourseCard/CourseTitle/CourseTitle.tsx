import { Col, Row } from "react-bootstrap";

interface ICourseTitleProps {
  title: string;
}

export default function CourseTitle({ title }: ICourseTitleProps) {
  return (
    <Row>
      <Col lg={12}>
        <h4 className="a-primary">{title}</h4>
      </Col>
    </Row>
  );
}
