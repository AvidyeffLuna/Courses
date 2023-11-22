import { useRouter } from "next/router";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import MediaFormulary from "./MediaFormulary/MediaFormulary";

export default function Media() {
  const router = useRouter();

  const getAboutCourseData = useCallback(() => {
    const projectDataStorage = localStorage.getItem("teacher-course-info")
      ? JSON.parse(localStorage.getItem("teacher-course-info") ?? "")
      : "";

    const { aboutCourseFields, tags } = projectDataStorage;

    if (!aboutCourseFields)
      router.push(TeacherCoursesRoutesEnum.CoursesCreate + "?step=1");

    if (!tags) router.push(TeacherCoursesRoutesEnum.CoursesCreate + "?step=2");
  }, [router]);

  useEffect(() => {
    getAboutCourseData();
  }, [getAboutCourseData]);

  return (
    <Row>
      <Col lg={12}>
        <MediaFormulary />
      </Col>
    </Row>
  );
}
