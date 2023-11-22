import { ICourse } from "domain/core/entities/courseEntity";
import { IGetShoppingCartByIdResponse } from "domain/core/response/shoppingCart/shoppingCartResponsesEntities";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import { Col, Row } from "react-bootstrap";
import Course from "./Course/Course";
import Header from "./Header/Header";

interface ICoursesProps {
  shoppingCart: IGetShoppingCartByIdResponse;
}

export default function Courses({ shoppingCart }: ICoursesProps) {
  if (shoppingCart.data.courses.length === 0) {
    return (
      <ErrorEmptyMessage
        title="Tu carrito esta vacio"
        description="No has agregado cursos a tu carrito de compras"
      />
    );
  }

  return (
    <Row>
      <Col lg={12}>
        <Header />
      </Col>

      {shoppingCart.data.courses.map((course: ICourse) => (
        <Col
          key={course.courseId}
          lg={12}
          className="py-4"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, .1)" }}
        >
          <Course course={course} />
        </Col>
      ))}
    </Row>
  );
}
