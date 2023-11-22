import { useRouter } from "next/router";
import { AdminSalesRoutesEnum } from "presentation/routes/AdminRoutes/salesRoutes";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface IFieldsProps {
  handleClose: () => void;
}

export default function Fields({ handleClose }: IFieldsProps) {
  const router = useRouter();

  const [values, setValues] = useState({
    minAmount: "",
    maxAmount: "",
    status: "",
  });

  const handleMinAmount = (value: string) => {
    if (value.length === 0) {
      setValues({ ...values, minAmount: value });
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setValues({ ...values, minAmount: value });
    }
  };

  const handleMaxAmount = (value: string) => {
    if (value.length === 0) {
      setValues({ ...values, maxAmount: value });
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setValues({ ...values, maxAmount: value });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    let searchParams = {
      min_amount: values.minAmount,
      max_amount: values.maxAmount,
      status: values.status,
    };
    let routerQuery = router.query;

    delete routerQuery.min_amount;
    delete routerQuery.max_amount;
    delete routerQuery.status;
    delete routerQuery.page;

    searchParams = Object.assign(searchParams, routerQuery);

    router.push({
      pathname: AdminSalesRoutesEnum.SalesList,
      query: searchParams,
    });

    handleClose();
  };

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      <Row>
        <Col lg={12} className="mb-3">
          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Select
              className="form-control"
              onChange={(e: any) =>
                setValues({ ...values, status: e.target.value })
              }
              defaultValue={values.status}
            >
              <option value="" disabled>
                Estado
              </option>
              <option value="">Todas</option>
              <option value="pending">Pendiente por revisión</option>
              <option value="approved">Aprobadas</option>
              <option value="rejected">Rechazadas</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={12} className="mb-4">
          <Form.Group>
            <Form.Label>Monto mínimo (USD)</Form.Label>
            <Form.Control
              type="text"
              value={values.minAmount}
              onChange={(e: any) => handleMinAmount(e.target.value)}
              placeholder="Monto mínimo"
            />
          </Form.Group>
        </Col>

        <Col lg={12} className="mb-4">
          <Form.Group>
            <Form.Label>Monto máximo (USD)</Form.Label>
            <Form.Control
              type="text"
              value={values.maxAmount}
              onChange={(e: any) => handleMaxAmount(e.target.value)}
              placeholder="Monto máximo"
            />
          </Form.Group>
        </Col>

        <Col lg={12} className="text-center mt-4">
          <Button type="submit" variant="primary">
            Filtrar pagos
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
