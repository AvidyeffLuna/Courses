import { ICourseItem } from "domain/core/entities/courseEntity";
import VideoPlayer from "presentation/components/common/core/Video/VideoPlayer";
import { Col, Row } from "react-bootstrap";
import Documents from "./Documents/Documents";

interface ILessonItemDetailProps {
  courseItem: ICourseItem;
}

export default function LessonItemDetail({
  courseItem,
}: ILessonItemDetailProps) {
  return (
    <Row>
      {courseItem.mainVideoUrl.length > 0 && (
        <Col lg={12} className="mb-3">
          <VideoPlayer videoUrl={courseItem.mainVideoUrl} autoPlay={false} />
        </Col>
      )}

      {courseItem.mediaList.length > 0 && (
        <Col lg={12} className="d-flex mb-4">
          <Documents
            mediaList={courseItem.mediaList.filter(
              (mediaFilter) => mediaFilter.type === "document"
            )}
          />
        </Col>
      )}
    </Row>
  );
}
