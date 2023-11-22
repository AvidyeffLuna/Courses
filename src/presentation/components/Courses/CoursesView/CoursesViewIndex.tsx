import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCourseByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import { Col, Row } from "react-bootstrap";
import Detail from "./Detail/Detail";
import Overview from "./Overview/Overview";

interface ICoursesViewIndexProps {
  course: IGetCourseByIdResponse | ICourseFailure;
}

export default function CoursesViewIndex({ course }: ICoursesViewIndexProps) {
  if ("code" in course) return <ErrorMessage />;

  if (!course.data?.courseId) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado el curso"
        description="No se ha podido encontrar el curso. Es posible que haya sido eliminado"
      />
    );
  }

  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5 mt-5">
        <Col lg={7} className="pe-5">
          <Detail course={course.data} />
        </Col>

        <Col lg={5}>
          <Overview course={course.data} />
        </Col>
      </Row>
    </div>
  );
}
