import { Col, Row } from "react-bootstrap";
import Teachers from "./Teachers/Teachers";
import Search from "./Search/Search";
import Link from "next/link";
import { AdminTeachersRoutesEnum } from "presentation/routes/AdminRoutes/teachersRoutes";

export default function TeachersList() {
  return (
    <div className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={12} className="mb-3">
          <h3>Instructores</h3>
        </Col>

        <Col lg={6}>
          <Link
            href={{
              pathname: AdminTeachersRoutesEnum.TeachersCreate,
            }}
          >
            <a className="btn btn-primary">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="fa-solid fa-plus icon-white" />
                </div>

                <div>Crear usuario como instructor</div>
              </div>
            </a>
          </Link>
        </Col>

        <Col lg={6} className="d-flex justify-content-end mb-5">
          <Search />
        </Col>

        <Col lg={12}>
          <Teachers />
        </Col>
      </Row>
    </div>
  );
}
