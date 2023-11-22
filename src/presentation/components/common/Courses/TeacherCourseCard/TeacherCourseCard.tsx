import { ICourse } from "domain/core/entities/courseEntity";
import { Col, Row } from "react-bootstrap";
import CourseImage from "./CourseImage/CourseImage";
import CoursePrice from "./CoursePrice/CoursePrice";
import CourseSummary from "./CourseSummary/CourseSummary";
import CourseTags from "./CourseTags/CourseTags";
import CourseTitle from "./CourseTitle/CourseTitle";

interface ITeacherCourseCardProps {
  course: ICourse;
}

export default function TeacherCourseCard({ course }: ITeacherCourseCardProps) {
  return (
    <Row>
      <Col lg={4}>
        <CourseImage pictureUrl={course.mainPictureUrl} />
      </Col>

      <Col lg={8}>
        <Row>
          <Col lg={12} className="mb-2">
            <CoursePrice price={course.price} />
          </Col>

          <Col lg={12} className="mb-2">
            <CourseTitle title={course.name} />
          </Col>

          <Col lg={12} className="mb-3">
            <CourseTags tags={course.tags} />
          </Col>

          <Col lg={12}>
            <CourseSummary
              lessons={course.lessons}
              students={course.students}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
