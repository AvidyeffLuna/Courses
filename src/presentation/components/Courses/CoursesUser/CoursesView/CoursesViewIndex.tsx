import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import { Col, Row } from "react-bootstrap";
import CourseContent from "./CourseContent/CourseContent";
import CourseLesson from "./CourseLesson/CourseLesson";

interface ICoursesViewIndexProps {
  course: IGetCourseUserByIdResponse | ICourseFailure;
}

export default function CoursesViewIndex({ course }: ICoursesViewIndexProps) {
  if ("code" in course) return <ErrorMessage />;

  if (!course.data?.courseUserId) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado el curso"
        description="No se ha podido encontrar el curso. Es posible que haya sido eliminado"
      />
    );
  }

  return (
    <div className="overflow-hidden">
      <Row>
        <Col lg={8}>
          <CourseLesson course={course} />
        </Col>

        <Col lg={4}>
          <CourseContent course={course} />
        </Col>
      </Row>
    </div>
  );
}
