import { Col, Row } from "react-bootstrap";
import Content from "./Content/Content";
import * as Styles from "./CallToActionStyles";

export default function CallToAction() {
  return (
    <Styles.CallToActionWrapper>
      <Styles.CallToActionContent>
        <Row className="align-items-center">
          <Col lg={12} className="d-flex justify-content-center text-center">
            <Content />
          </Col>
        </Row>
      </Styles.CallToActionContent>

      <Styles.CallToActionBackdrop />
    </Styles.CallToActionWrapper>
  );
}
