import CoursesViewProvider from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { ICourseLesson } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import LessonsItemsList from "./LessonsItemsList/LessonsItemsList";

interface ILessonCardProps {
  courseLesson: ICourseLesson;
  index: number;
}

export default function LessonCard({ courseLesson, index }: ILessonCardProps) {
  const router = useRouter();

  const [showItems, setShowItems] = useState(false);

  const onShowLessonItems = useCallback(() => {
    if (courseLesson.courseLessonId === router.query?.lessonId) {
      setShowItems(true);
    }
  }, [courseLesson.courseLessonId, router.query?.lessonId]);

  useEffect(() => {
    if (router.query?.lessonId) onShowLessonItems();
  }, [onShowLessonItems, router.query]);

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={12} className="mb-2">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div>
                  <p>Sección {index}</p>
                </div>

                <div style={{ marginTop: "-10px" }}>
                  <h4>{courseLesson.title}</h4>
                </div>

                <div>
                  <p>{courseLesson.items} clases</p>
                </div>
              </div>

              <div>
                <Button variant="icon" onClick={() => setShowItems(!showItems)}>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <i
                        className="fa-solid fa-plus icon-primary"
                        style={{ fontSize: "25px" }}
                      />
                    </div>

                    <div className="mt-2">
                      <p className="text-primary">
                        {showItems ? "Ocultar clases" : "Expandir clases"}
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </Col>

          {showItems && (
            <>
              <div className="mb-3">
                <hr />
              </div>

              <Col lg={12}>
                <CoursesViewProvider>
                  <LessonsItemsList
                    courseId={courseLesson.courseId}
                    courseLessonId={courseLesson.courseLessonId}
                  />
                </CoursesViewProvider>
              </Col>
            </>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
