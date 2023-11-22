import { Col, Row } from "react-bootstrap";
import About from "./About/About";
import Logo from "./Logo/Logo";
import Influencer from "./Influencer/Influencer";
import Resources from "./Resources/Resources";
import Copyright from "./Copyright/Copyright";
import * as Styles from "./DefaultFooterStyles";

export default function DefaultFooter() {
  return (
    <Styles.DefaultFooterWrapper className="overflow-hidden">
      <Row className="py-5 px-5">
        <Col lg={3} md={12} sm={12} xs={12} className="mb-5">
          <Logo />
        </Col>

        <Col lg={3} md={4} sm={4} xs={6} className="mb-4">
          <About />
        </Col>

        <Col lg={3} md={4} sm={4} xs={6} className="mb-4">
          <Influencer />
        </Col>

        <Col lg={3} md={4} sm={4} xs={6} className="mb-4">
          <Resources />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Copyright />
        </Col>
      </Row>
    </Styles.DefaultFooterWrapper>
  );
}
