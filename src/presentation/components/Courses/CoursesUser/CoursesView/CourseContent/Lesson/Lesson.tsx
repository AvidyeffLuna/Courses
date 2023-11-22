import { ICourseLesson } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Lectures from "./Lectures/Lectures";

interface ILessonProps {
  lesson: ICourseLesson;
  index: number;
}

export default function Lesson({ lesson, index }: ILessonProps) {
  const router = useRouter();

  const [showLecture, setShowLecture] = useState(false);

  const onShowLecture = useCallback(() => {
    if (router.query?.lesson == lesson.courseLessonId) setShowLecture(true);
  }, [lesson.courseLessonId, router.query?.lesson]);

  useEffect(() => {
    onShowLecture();
  }, [onShowLecture]);

  return (
    <Button
      variant=""
      className="py-3 px-4 pb-2 w-100 text-start"
      style={{ borderRadius: 0, borderBottom: "1px solid rgba(0, 0, 0, .1)" }}
      onClick={() => setShowLecture(!showLecture)}
    >
      <Row className="px-0">
        <Col lg={12} className="px-0">
          <div className="d-flex justify-content-between">
            <div className="pe-4">
              <h4>
                Sección {index}: {lesson.title}
              </h4>
            </div>

            <div>
              {showLecture ? (
                <i
                  className="fa-solid fa-chevron-up icon-gray"
                  style={{ fontSize: "15px" }}
                />
              ) : (
                <i
                  className="fa-solid fa-chevron-down icon-gray"
                  style={{ fontSize: "15px" }}
                />
              )}
            </div>
          </div>
        </Col>

        <Col lg={12} className="px-0">
          <p>{lesson.items} clases</p>
        </Col>

        {showLecture && (
          <Col lg={12} className="px-0">
            <Lectures lesson={lesson} />
          </Col>
        )}
      </Row>
    </Button>
  );
}
