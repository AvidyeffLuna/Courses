import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function Prices() {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Row>
            <Col lg={12} className="mb-3">
              <h4>Precios</h4>
            </Col>

            <Col lg={12} className="mb-3">
              <Form.Group>
                <Form.Control
                  placeholder="Monto minimo"
                  aria-label="Monto minimo"
                  aria-describedby="search-button"
                />
              </Form.Group>
            </Col>

            <Col lg={12} className="mb-4">
              <Form.Group>
                <Form.Control
                  placeholder="Monto máximo"
                  aria-label="Monto máximo"
                  aria-describedby="search-button"
                />
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
