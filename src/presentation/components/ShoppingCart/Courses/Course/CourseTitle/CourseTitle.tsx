import Link from "next/link";
import { CoursesRoutesEnum } from "presentation/routes/coursesRoutes";
import { Col, Row } from "react-bootstrap";

interface ICourseTitleProps {
  title: string;
  slug: string;
}

export default function CourseTitle({ title, slug }: ICourseTitleProps) {
  return (
    <Row>
      <Col lg={12}>
        <Link
          href={{
            pathname: CoursesRoutesEnum.CoursesView,
            query: { slug: slug },
          }}
        >
          <a>
            <h4 className="a-primary">{title}</h4>
          </a>
        </Link>
      </Col>
    </Row>
  );
}
