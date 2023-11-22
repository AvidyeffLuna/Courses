import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesUser/CoursesView/CoursesViewContext";
import VideoPlayer from "presentation/components/common/core/Video/VideoPlayer";
import { useContext } from "react";

export default function CourseVideo() {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: item } = state.item;

  return (
    <div style={{ height: "550px", width: "100%" }}>
      <VideoPlayer videoUrl={item.mainVideoUrl} autoPlay={false} />
    </div>
  );
}
