import { Col, Container, Row } from "react-bootstrap";
import Allies from "./Allies/Allies";
import CallToAction from "./CallToAction/CallToAction";
import Hero from "./Hero/Hero";
import Innovative from "./Innovative/Innovative";
import Trust from "./Trust/Trust";
import WhyWe from "./WhyWe/WhyWe";

export default function HomeIndex() {
  return (
    <div className="overflow-hidden">
      <Row>
        <Col lg={12} className="mb-5">
          <Hero />
        </Col>

        <Col lg={12} className="mb-5 py-5">
          <Container>
            <Innovative />
          </Container>
        </Col>

        <Col lg={12} className="mb-5 py-5">
          <Container>
            <Trust />
          </Container>
        </Col>

        <Col lg={12} className="mb-5 py-5">
          <Container fluid="xs">
            <CallToAction />
          </Container>
        </Col>

        <Col lg={12} className="mb-5 py-5">
          <Container>
            <WhyWe />
          </Container>
        </Col>

        <Col lg={12} className="mb-5 py-5">
          <Container>
            <Allies />
          </Container>
        </Col>
      </Row>
    </div>
  );
}
