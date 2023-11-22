import { ICourse } from "domain/core/entities/courseEntity";
import { Col, Row } from "react-bootstrap";
import AddToCart from "./AddToCart/AddToCart";
import AddToWhiteList from "./AddToWhiteList/AddToWhiteList";
import Summary from "./Summary/Summary";

interface IOverviewProps {
  course: ICourse;
}

export default function Overview({ course }: IOverviewProps) {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <AddToCart course={course} />
      </Col>

      <Col lg={12} className="mb-4">
        <AddToWhiteList course={course} />
      </Col>

      <Col lg={12}>
        <Summary course={course} />
      </Col>
    </Row>
  );
}
