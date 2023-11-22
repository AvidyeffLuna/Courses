import RatingsView from "presentation/components/common/core/Ratings/RatingsView";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { Col, Row } from "react-bootstrap";

interface ICourseTitleProps {
  title: string;
  date: Date;
  totalRatings: number;
  countRatings: number;
}

export default function CourseTitle({
  title,
  date,
  totalRatings,
  countRatings,
}: ICourseTitleProps) {
  return (
    <Row>
      <Col lg={12} className="mb-1">
        <h2>{title}</h2>
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
              <p>{getFullDate(new Date(date))}</p>
            </div>
          </div>

          <div style={{ marginTop: "-15px" }}>
            <RatingsView
              totalRatings={totalRatings}
              countRatings={countRatings}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}
