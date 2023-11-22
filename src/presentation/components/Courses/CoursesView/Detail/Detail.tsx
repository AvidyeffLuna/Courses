import { ICourse } from "domain/core/entities/courseEntity";
import { Col, Row } from "react-bootstrap";
import CourseAbout from "./CourseAbout/CourseAbout";
import CourseImage from "./CourseImage/CourseImage";
import CourseTags from "./CourseTags/CourseTags";
import CourseTitle from "./CourseTitle/CourseTitle";
import CourseVideo from "./CourseVideo/CourseVideo";

interface IDetailProps {
  course: ICourse;
}

export default function Detail({ course }: IDetailProps) {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <CourseImage mainPictureUrl={course.mainPictureUrl} />
      </Col>

      <Col lg={12} className="mb-4">
        <CourseTags tags={course.tags} />
      </Col>

      <Col lg={12} className="mb-4">
        <CourseTitle
          title={course.name}
          date={course.initCourseDate}
          totalRatings={course.totalRatings}
          countRatings={course.countRatings}
        />
      </Col>

      <Col lg={12} className="mb-5">
        <CourseVideo mainVideoUrl={course.mainVideoUrl} />
      </Col>

      <Col lg={12} className="mb-5">
        <CourseAbout description={course.description} />
      </Col>
    </Row>
  );
}
