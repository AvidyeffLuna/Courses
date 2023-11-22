import { Col, Row } from "react-bootstrap";
import TimeLineList from "./TimelineList/TimeLineList";
import * as Styles from "./TimelineStyles";

export default function Timeline() {
  return (
    <Styles.TimelineWrapper>
      <Row className="py-5 px-4">
        <Col lg={12}>
          <TimeLineList />
        </Col>
      </Row>
    </Styles.TimelineWrapper>
  );
}
