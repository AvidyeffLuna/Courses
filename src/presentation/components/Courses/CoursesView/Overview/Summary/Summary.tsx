import { ICourse } from "domain/core/entities/courseEntity";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { Col, Row } from "react-bootstrap";

interface ISummaryProps {
  course: ICourse;
}

export default function Summary({ course }: ISummaryProps) {
  return (
    <Row>
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
                className="fa-solid fa-laptop-file icon-primary"
                style={{ fontSize: "25px" }}
              />
            </div>

            <div>
              <p className="font-weight-700">Clases:</p>
            </div>
          </div>

          <div className="ms-2">
            <p>{course.items}</p>
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

      {course.updatedAt && (
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
                <p className="font-weight-700">Última actualización:</p>
              </div>
            </div>

            <div className="ms-2">
              <p>{getFullDate(new Date(course.updatedAt))}</p>
            </div>
          </div>
        </Col>
      )}
    </Row>
  );
}
