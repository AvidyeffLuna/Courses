import { useRouter } from "next/router";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface IFieldsProps {
  handleClose: () => void;
}

export default function Fields({ handleClose }: IFieldsProps) {
  const router = useRouter();

  const [values, setValues] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const handleMinPrice = (value: string) => {
    if (value.length === 0) {
      setValues({ ...values, minPrice: value });
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setValues({ ...values, minPrice: value });
    }
  };

  const handleMaxPrice = (value: string) => {
    if (value.length === 0) {
      setValues({ ...values, maxPrice: value });
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setValues({ ...values, maxPrice: value });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    let searchParams = {
      min_price: values.minPrice,
      max_price: values.maxPrice,
    };
    let routerQuery = router.query;

    delete routerQuery.min_price;
    delete routerQuery.max_price;
    delete routerQuery.page;

    searchParams = Object.assign(searchParams, routerQuery);

    router.push({
      pathname: TeacherCoursesRoutesEnum.CoursesList,
      query: searchParams,
    });

    handleClose();
  };

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      <Row>
        <Col lg={12} className="mb-4">
          <Form.Group>
            <Form.Label>Precio mínimo del curso (USD)</Form.Label>
            <Form.Control
              type="text"
              value={values.minPrice}
              onChange={(e: any) => handleMinPrice(e.target.value)}
              placeholder="Precio mínimo del curso"
            />
          </Form.Group>
        </Col>

        <Col lg={12} className="mb-4">
          <Form.Group>
            <Form.Label>Precio máximo del curso (USD)</Form.Label>
            <Form.Control
              type="text"
              value={values.maxPrice}
              onChange={(e: any) => handleMaxPrice(e.target.value)}
              placeholder="Precio máximo del curso"
            />
          </Form.Group>
        </Col>

        <Col lg={12} className="text-center mt-4">
          <Button type="submit" variant="primary">
            Filtrar cursos
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
