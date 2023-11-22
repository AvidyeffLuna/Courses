import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import VideoPlayer from "presentation/components/common/core/Video/VideoPlayer";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";

export default function CourseVideo() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h3>Introducción al curso</h3>
      </Col>

      <Col lg={12} style={{ paddingBottom: "200px" }}>
        <div style={{ height: "400px", width: "100%" }}>
          <VideoPlayer videoUrl={course.mainVideoUrl} autoPlay={false} />
        </div>
      </Col>
    </Row>
  );
}
