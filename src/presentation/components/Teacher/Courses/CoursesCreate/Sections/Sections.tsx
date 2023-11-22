import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import AboutCourse from "./AboutCourse/AboutCourse";
import Media from "./Media/Media";
import Summary from "./Summary/Summary";

export default function Sections() {
  const router = useRouter();

  const getSectionFormularyComponent = () => {
    switch (router.query.step) {
      case "1":
        return <AboutCourse />;
      case "2":
        return <Media />;
      case "3":
        return <Summary />;

      default:
        return <AboutCourse />;
    }
  };

  return (
    <Row>
      <Col lg={12}>{getSectionFormularyComponent()}</Col>
    </Row>
  );
}
