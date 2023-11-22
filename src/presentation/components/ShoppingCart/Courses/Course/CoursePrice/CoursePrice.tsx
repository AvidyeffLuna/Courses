import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { Col, Row } from "react-bootstrap";

interface ICoursePriceProps {
  price: number;
}

export default function CoursePrice({ price }: ICoursePriceProps) {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="text-primary">
              {getNumberFormat({ value: price, style: "currency" })}
            </h4>
          </div>
        </div>
      </Col>
    </Row>
  );
}
