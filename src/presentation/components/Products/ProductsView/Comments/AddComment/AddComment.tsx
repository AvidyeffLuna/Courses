import { Button, Col, Form, Row } from "react-bootstrap";

export default function AddComment() {
  return (
    <Form>
      <Row>
        <Col lg={12}>
          <div className="d-flex align-items-center">
            <div className="w-100 me-4">
              <Form.Group>
                <Form.Control
                  placeholder="Escribe tu duda..."
                  aria-label="Escribe tu duda..."
                  className="w-100"
                />
              </Form.Group>
            </div>

            <div>
              <Button variant="primary" style={{ width: "200px" }}>
                Enviar duda
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
