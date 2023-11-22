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
    status: "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    let searchParams = {
      status: values.status,
    };
    let routerQuery = router.query;

    delete routerQuery.status;
    delete routerQuery.page;

    searchParams = Object.assign(searchParams, routerQuery);

    router.push({
      pathname: TeacherCoursesRoutesEnum.CoursesView,
      query: searchParams,
    });

    handleClose();
  };

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      <Row>
        <Col lg={12}>
          <Form.Label>Estado</Form.Label>

          <Form.Select
            className="form-control"
            value={values.status}
            onChange={(e: any) =>
              setValues({ ...values, status: e.target.value })
            }
          >
            <option value="">Todos los estados</option>
            <option value="pending">Pendientes por revisión</option>
            <option value="view">Revisados</option>
          </Form.Select>
        </Col>

        <Col lg={12} className="text-center mt-4">
          <Button type="submit" variant="primary">
            Filtrar entregas
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
