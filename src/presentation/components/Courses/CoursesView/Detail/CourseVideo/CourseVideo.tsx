import VideoPlayer from "presentation/components/common/core/Video/VideoPlayer";
import { Col, Row } from "react-bootstrap";

interface ICourseVideoProps {
  mainVideoUrl: string;
}

export default function CourseVideo({ mainVideoUrl }: ICourseVideoProps) {
  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h3>Introducción al curso</h3>
      </Col>

      <Col lg={12}>
        <VideoPlayer videoUrl={mainVideoUrl} autoPlay={false} />
      </Col>
    </Row>
  );
}
