import { ICourseItem } from "domain/core/entities/courseEntity";
import Link from "next/link";
import { useRouter } from "next/router";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import LessonItemDetail from "./LessonItemDetail/LessonItemDetail";

interface ILessonItemProps {
  courseItem: ICourseItem;
  index: number;
}

export default function LessonItem({ courseItem, index }: ILessonItemProps) {
  const router = useRouter();

  const [showLessonItem, setShowLessonItem] = useState(false);

  return (
    <Row>
      <Col lg={12}>
        <h4>
          {index}. {courseItem.title}
        </h4>
      </Col>

      <Col lg={12}>
        <p>{courseItem.description}</p>
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-center">
          <div className="me-4">
            <Button
              variant="link"
              className="py-0 px-0"
              onClick={() => setShowLessonItem(!showLessonItem)}
            >
              <div className="d-flex">
                <div className="me-2">
                  <i
                    className="fa-solid fa-eye icon-primary"
                    style={{ fontSize: "20px" }}
                  />
                </div>

                <div>
                  <p className="text-primary">
                    {showLessonItem ? "Ocultar" : "Ver"}
                  </p>
                </div>
              </div>
            </Button>
          </div>

          <div className="me-4">
            <Link
              href={{
                pathname: TeacherCoursesRoutesEnum.CoursesLessonsItemsEdit,
                query: {
                  slug: router.query.slug,
                  courseLessonId: courseItem.courseLessonId,
                  courseItemId: courseItem.courseItemId,
                },
              }}
            >
              <a className="btn btn-link py-0 px-0">
                <div className="d-flex">
                  <div className="me-2">
                    <i
                      className="fa-solid fa-pen icon-primary"
                      style={{ fontSize: "20px" }}
                    />
                  </div>

                  <div>
                    <p className="text-primary">Editar</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>

          <div className="me-4">
            <Button variant="link" className="py-0 px-0">
              <div className="d-flex">
                <div className="me-2">
                  <i
                    className="fa-solid fa-trash icon-danger"
                    style={{ fontSize: "20px" }}
                  />
                </div>

                <div>
                  <p className="text-danger">Eliminar</p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </Col>

      {showLessonItem && (
        <Col lg={12} className="mt-4">
          <LessonItemDetail courseItem={courseItem} />
        </Col>
      )}
    </Row>
  );
}
