import RatingsView from "presentation/components/common/core/Ratings/RatingsView";
import { Col, Row } from "react-bootstrap";

interface ICourseRatingsProps {
  countRatings: number;
  totalRatings: number;
}

export default function CourseRatings({
  countRatings,
  totalRatings,
}: ICourseRatingsProps) {
  return (
    <Row>
      <Col lg={12}>
        <RatingsView
          countRatings={countRatings}
          totalRatings={totalRatings}
          size="17px"
          showText={false}
        />
      </Col>
    </Row>
  );
}
