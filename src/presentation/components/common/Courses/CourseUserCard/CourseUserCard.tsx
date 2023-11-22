import { ICourseUser } from "domain/core/entities/courseEntity";
import { Col, Row } from "react-bootstrap";
import CourseCompleted from "./CourseCompleted/CourseCompleted";
import CourseImage from "./CourseImage/CourseImage";
import CourseSummary from "./CourseSummary/CourseSummary";
import CourseTags from "./CourseTags/CourseTags";
import CourseTitle from "./CourseTitle/CourseTitle";

interface ICourseUserCardProps {
  course: ICourseUser;
}

export default function CourseUserCard({ course }: ICourseUserCardProps) {
  return (
    <Row>
      <Col lg={5}>
        <CourseImage pictureUrl={course.course?.mainPictureUrl ?? ""} />
      </Col>

      <Col lg={7}>
        <Row>
          <Col lg={12} className="mb-2">
            <CourseTitle title={course.course?.name ?? ""} />
          </Col>

          <Col lg={12} className="mb-3">
            <CourseTags tags={course.course?.tags ?? []} />
          </Col>

          <Col lg={12} className="mb-2">
            <CourseSummary
              lessons={course.course?.lessons ?? 0}
              students={course.course?.students ?? 0}
            />
          </Col>

          <Col lg={12}>
            <CourseCompleted isCompleted={course.isCompleted} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
