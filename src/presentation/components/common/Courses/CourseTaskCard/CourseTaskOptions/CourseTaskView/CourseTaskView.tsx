import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { Url } from "url";

interface ICourseTaskViewProps {
  href: Url;
}

export default function CourseTaskView({ href }: ICourseTaskViewProps) {
  return (
    <Row>
      <Col lg={12}>
        <Link href={href}>
          <a className="btn btn-link py-0 px-0">
            <div className="d-flex">
              <div className="me-2">
                <i
                  className="fa-solid fa-edit icon-primary"
                  style={{ fontSize: "20px" }}
                />
              </div>

              <div>
                <p className="text-primary">Realizar tarea</p>
              </div>
            </div>
          </a>
        </Link>
      </Col>
    </Row>
  );
}
