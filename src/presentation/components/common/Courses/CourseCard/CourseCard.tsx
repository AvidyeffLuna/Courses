import { ICourse } from "domain/core/entities/courseEntity";
import { Col, Row } from "react-bootstrap";
import CourseImage from "./CourseImage/CourseImage";
import CoursePrice from "./CoursePrice/CoursePrice";
import CourseRatings from "./CourseRatings/CourseRatings";
import CourseSummary from "./CourseSummary/CourseSummary";
import CourseTags from "./CourseTags/CourseTags";
import CourseTitle from "./CourseTitle/CourseTitle";

interface ICourseCardProps {
  course: ICourse;
  showFavourite?: boolean;
}

export default function CourseCard({
  course,
  showFavourite = true,
}: ICourseCardProps) {
  return (
    <Row>
      <Col lg={5}>
        <CourseImage pictureUrl={course.mainPictureUrl} />
      </Col>

      <Col lg={7}>
        <Row>
          <Col lg={12} className="mb-2">
            <CoursePrice
              price={course.price}
              favorite={course.isFavorite ?? false}
              showFavourite={showFavourite}
            />
          </Col>

          <Col lg={12} className="mb-2">
            <CourseTitle title={course.name} />
          </Col>

          <Col lg={12} className="mb-3">
            <CourseTags tags={course.tags} />
          </Col>

          <Col lg={12}>
            <CourseRatings
              countRatings={course.countRatings}
              totalRatings={course.totalRatings}
            />
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
