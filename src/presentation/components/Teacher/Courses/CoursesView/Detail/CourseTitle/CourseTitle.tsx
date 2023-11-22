import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import RatingsView from "presentation/components/common/core/Ratings/RatingsView";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";

export default function CourseTitle() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  return (
    <Row>
      <Col lg={12} className="mb-1">
        <h2>{course.name}</h2>
      </Col>

      <Col lg={12}>
        <div className="d-flex">
          <div className="d-flex align-items-center me-5">
            <div className="me-3" style={{ marginTop: "-10px" }}>
              <i
                className="fa-regular fa-clock icon-primary"
                style={{ fontSize: "20px" }}
              />
            </div>

            <div>
              <p>{getFullDate(new Date(course.createdAt))}</p>
            </div>
          </div>

          <div style={{ marginTop: "-15px" }}>
            <RatingsView
              totalRatings={course.totalRatings}
              countRatings={course.countRatings}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}
