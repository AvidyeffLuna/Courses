import { Button, Col, Row } from "react-bootstrap";

export default function Quantity() {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center">
          <div className="d-flex">
            <div className="me-3">
              <Button
                variant="primary"
                style={{ borderRadius: "2rem", padding: "0px 6px" }}
              >
                <i className="fa-solid fa-minus" style={{ fontSize: "18px" }} />
              </Button>
            </div>

            <div className="me-3">
              <p>1</p>
            </div>

            <div>
              <Button
                variant="primary"
                style={{ borderRadius: "2rem", padding: "0px 6px" }}
              >
                <i className="fa-solid fa-plus" style={{ fontSize: "18px" }} />
              </Button>
            </div>
          </div>

          <div></div>
        </div>
      </Col>
    </Row>
  );
}
