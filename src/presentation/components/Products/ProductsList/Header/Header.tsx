import { Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div>
              <h3>{router.query?.search_query ?? ""}</h3>
            </div>

            <div>
              <p>6 resultados respecto a tu búsqueda</p>
            </div>
          </div>

          <div>
            <Form className="d-flex align-items-center">
              <Form.Label className="me-3">Ordenar por</Form.Label>
              <Form.Select
                aria-label="products-sort-by"
                className="form-control"
                style={{ width: "200px" }}
              >
                <option value="recently">Lo más nuevo</option>
                <option value="sell">Lo más vendido</option>
                <option value="featured">Lo más destacado</option>
              </Form.Select>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
}
