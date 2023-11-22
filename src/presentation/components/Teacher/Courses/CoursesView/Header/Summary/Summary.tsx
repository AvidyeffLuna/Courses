import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";

export default function Summary() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h2 className="text-primary">
          {getNumberFormat({ value: course.price, style: "currency" })}
        </h2>
      </Col>

      <Col lg={12} className="mb-3">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <i
                className="fa-solid fa-person-chalkboard icon-primary"
                style={{ fontSize: "25px" }}
              />
            </div>

            <div>
              <p className="font-weight-700">Instructor:</p>
            </div>
          </div>

          <div className="ms-2">
            <p>
              {course.teacher?.firstName} {course.teacher?.lastName}
            </p>
          </div>
        </div>
      </Col>

      <Col lg={12} className="mb-3">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <i
                className="fa-solid fa-chalkboard-user icon-primary"
                style={{ fontSize: "25px" }}
              />
            </div>

            <div>
              <p className="font-weight-700">Secciones:</p>
            </div>
          </div>

          <div className="ms-2">
            <p>{course.lessons}</p>
          </div>
        </div>
      </Col>

      <Col lg={12} className="mb-3">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <i
                className="fa-solid fa-people-group icon-primary"
                style={{ fontSize: "25px" }}
              />
            </div>

            <div>
              <p className="font-weight-700">Estudiantes:</p>
            </div>
          </div>

          <div className="ms-2">
            <p>{course.students}</p>
          </div>
        </div>
      </Col>

      <Col lg={12} className="mb-3">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <i
                className="fa-solid fa-arrows-rotate icon-primary"
                style={{ fontSize: "25px" }}
              />
            </div>

            <div>
              <p className="font-weight-700">Inicia el:</p>
            </div>
          </div>

          <div className="ms-2">
            <p>{getFullDate(new Date(course.initCourseDate))}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
