import {
  CoursesCreateContext,
  ICoursesCreateContext,
} from "application/context/Teacher/Courses/CoursesCreate/CoursesCreateContext";
import { IFile } from "domain/core/entities/fileEntity";
import { ICourse } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { useRouter } from "next/router";
import { printLogError } from "presentation/logs/logs";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Video from "./Video/Video";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import Picture from "./Picture/Picture";
import { createCourseFailures } from "domain/mappers/failures/course/courseFailures";

export default function MediaFormulary() {
  const { state, actions, dispatch } =
    useContext<ICoursesCreateContext>(CoursesCreateContext);
  const { createCourse } = actions;
  const { data: course, loading, sucessful, error } = state.createCourse;

  const router = useRouter();

  const [picture, setPicture] = useState<IFile>({} as IFile);
  const [video, setVideo] = useState<IFile>({} as IFile);
  const [hasError, setHasError] = useState<ICourseFailure | null>(null);

  const getCourseStorage = () => {
    const courseDataStorage = localStorage.getItem("teacher-course-info")
      ? JSON.parse(localStorage.getItem("teacher-course-info") ?? "")
      : "";

    return courseDataStorage;
  };

  const getCourseKeywords = (courseName: string): string[] => {
    let keywords: string[] = [];

    if (courseName.length > 0) keywords = courseName.toLowerCase().split(" ");

    return keywords;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setHasError(null);

    const { aboutCourseFields, tags } = getCourseStorage();

    if (!video || !picture) return;

    const courseCreate: ICourse = {
      courseId: "",
      teacherId: "",
      name: aboutCourseFields.courseName,
      initCourseDate: new Date(
        parseInt(aboutCourseFields.initCourseYear, 10),
        parseInt(aboutCourseFields.initCourseMonth, 10),
        parseInt(aboutCourseFields.initCourseDay, 10)
      ),
      description: aboutCourseFields.description,
      tags: tags,
      views: 0,
      mainPicture: picture,
      mainVideo: video,
      createdAt: new Date(),
      price: parseFloat(aboutCourseFields.coursePrice),
      favorite: 0,
      keywords: getCourseKeywords(aboutCourseFields.courseName),
      slug: "",
      lessons: 0,
      students: 0,
      mainVideoUrl: "",
      mainPictureUrl: "",
      countRatings: 0,
      totalRatings: 0,
      items: 0,
      tasks: 0,
    };

    createCourse({ course: courseCreate })(dispatch);
  };

  const handleCreateCourseSucessfull = useCallback(() => {
    localStorage.removeItem("teacher-course-info");

    router.push(
      TeacherCoursesRoutesEnum.CoursesCreate +
        `?step=3&courseId=${course.courseId}`
    );

    window.scrollTo(0, 0);
  }, [course.courseId, router]);

  const handleCreateCourseError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleCreateCourseSucessfull();
  }, [sucessful, handleCreateCourseSucessfull]);

  useEffect(() => {
    if (error) handleCreateCourseError();
  }, [error, handleCreateCourseError]);

  const getErrorMessage = () => {
    switch (hasError?.code) {
      case createCourseFailures["SLUG_IN_USE"]:
        return "Ya se encuentra un curso creado con este nombre. Utilice otro nombre y vuelva a intentarlo.";

      default:
        return "Lo sentimos, algo no ha salido como se esperaba. Comprueba tu conexión y vuelve a intentarlo.";
    }
  };

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      {hasError && (
        <Alert variant="danger" className="mb-5">
          {getErrorMessage()}
        </Alert>
      )}

      <Row className="mb-5">
        <Col lg={12}>
          <Picture file={picture} setFile={setPicture} />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={12}>
          <Video file={video} setFile={setVideo} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <Button
            type="submit"
            variant="primary"
            className="btn-scale py-2"
            style={{ width: "250px" }}
            disabled={loading}
          >
            {loading ? (
              <Spinner
                animation="border"
                variant="light"
                className="spinner-border-light"
              />
            ) : (
              "Crear curso"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
