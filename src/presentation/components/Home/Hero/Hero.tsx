import { Col, Row } from "react-bootstrap";
import HeroContent from "./HeroContent/HeroContent";
import * as Styles from "./HeroStyles";

export default function Hero() {
  return (
    <Styles.HeroWrapper>
      <Styles.HeroContent>
        <Row>
          <Col lg={8}>
            <HeroContent />
          </Col>
        </Row>
      </Styles.HeroContent>

      <Styles.HeroBackdrop />

      <Styles.HeroItemFirst />

      <Styles.HeroItemSecond />

      <Styles.HeroItemThird />
    </Styles.HeroWrapper>
  );
}
