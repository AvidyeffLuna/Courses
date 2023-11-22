import {
  CoursesCreateContext,
  ICoursesCreateContext,
} from "application/context/Teacher/Courses/CoursesCreate/CoursesCreateContext";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import DetailItem from "./DetailItem/DetailItem";

export default function CourseDetail() {
  const { state } = useContext<ICoursesCreateContext>(CoursesCreateContext);
  const { data: course } = state.course;

  return (
    <Row>
      <Col lg={12}>
        <DetailItem title="Nombre del curso" text={course.name} />
      </Col>

      <Col lg={12}>
        <DetailItem
          title="Precio del curso"
          text={getNumberFormat({
            value: course.price,
            style: "currency",
          })}
        />
      </Col>

      <Col lg={12}>
        <DetailItem
          title="Inicio del curso"
          text={getFullDate(new Date(course.initCourseDate))}
        />
      </Col>

      <Col lg={12}>
        <DetailItem
          title="Fecha de creación"
          text={getFullDate(new Date(course.createdAt))}
        />
      </Col>
    </Row>
  );
}
