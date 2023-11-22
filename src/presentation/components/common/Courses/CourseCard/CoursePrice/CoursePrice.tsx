import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { Col, Row } from "react-bootstrap";

interface ICoursePriceProps {
  price: number;
  favorite: boolean;
  showFavourite: boolean;
}

export default function CoursePrice({
  price,
  favorite,
  showFavourite,
}: ICoursePriceProps) {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h3 className="text-primary">
              {getNumberFormat({ value: price, style: "currency" })}
            </h3>
          </div>

          {showFavourite && (
            <div>
              <i
                className={
                  favorite
                    ? "fa-solid fa-heart icon-danger"
                    : "fa-regular fa-heart icon-dark"
                }
                style={{ fontSize: "25px" }}
              />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}
