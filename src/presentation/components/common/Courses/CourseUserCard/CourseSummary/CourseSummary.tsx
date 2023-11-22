import { Col, Row } from "react-bootstrap";

interface ICourseSummaryProps {
  lessons: number;
  students: number;
}

export default function CourseSummary({
  lessons,
  students,
}: ICourseSummaryProps) {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-4">
            <div className="me-3">
              <i
                className="fa-solid fa-chalkboard-user icon-primary"
                style={{ fontSize: "20px" }}
              />
            </div>

            <div className="mt-2">
              <p className="font-size-md">{lessons} secciones</p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="me-3">
              <i
                className="fa-solid fa-people-group icon-primary"
                style={{ fontSize: "20px" }}
              />
            </div>

            <div className="mt-2">
              <p className="font-size-md">{students} estudiantes</p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
