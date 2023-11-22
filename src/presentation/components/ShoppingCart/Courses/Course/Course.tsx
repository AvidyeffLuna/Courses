import { ICourse } from "domain/core/entities/courseEntity";
import { Col, Row } from "react-bootstrap";
import CourseDelete from "./CourseDelete/CourseDelete";
import CourseImage from "./CourseImage/CourseImage";
import CoursePrice from "./CoursePrice/CoursePrice";
import CourseTitle from "./CourseTitle/CourseTitle";

interface ICourseProps {
  course: ICourse;
}

export default function Course({ course }: ICourseProps) {
  return (
    <Row>
      <Col lg={2}>
        <CourseImage pictureUrl={course.mainPictureUrl} />
      </Col>

      <Col lg={10}>
        <Row>
          <Col lg={12}>
            <CourseTitle title={course.name} slug={course.slug} />
          </Col>

          <Col lg={12}>
            <CoursePrice price={course.price} />
          </Col>

          <Col lg={12}>
            <CourseDelete courseId={course.courseId} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
