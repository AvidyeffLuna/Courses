import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function Genrer() {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Row>
            <Col lg={12} className="mb-3">
              <h4>Especialidad</h4>
            </Col>

            <Col lg={12} className="mb-4">
              <Form.Group>
                <Form.Select
                  aria-label="genrer-filter"
                  className="form-control"
                >
                  <option>Todas las especialidades</option>
                  <option value="1">Mujeres</option>
                  <option value="2">Hombres</option>
                  <option value="3">Niños</option>
                  <option value="3">Niñas</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col lg={12}>
              <Button variant="primary">Filtrar por precio</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
