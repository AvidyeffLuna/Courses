import { Col, Row } from "react-bootstrap";
import Service from "./Service/Service";

export default function ServicesList() {
  return (
    <Row>
      <Col lg={4} className="mb-3">
        <Service
          title="Productos"
          description="Explora nuestro catalogo de productos tecnologicos, compra y recibe tu producto sumamente rápido"
          icon="https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fmarket.png?alt=media&token=1c14da3d-a51f-476e-ad24-8f51259f0e49"
          href="/"
        />
      </Col>

      <Col lg={4} className="mb-3">
        <Service
          title="Servicios"
          description="Tenemos numerosos servicios para nuestros clientes, ayudandolos a crecer y ayudandolos a solucionar sus problemas"
          icon="https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fservice.png?alt=media&token=f3f90183-1ed8-4786-952d-d52144036b54"
          href="/"
        />
      </Col>

      <Col lg={4} className="mb-3">
        <Service
          title="Cursos"
          description="Con diferentes cursos de tecnologia para ayudar a nuestros clientes de manera óptima y adecuada a través de la enseñanza"
          icon="https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fcourse.png?alt=media&token=02aa28d9-f85a-463c-aa5b-2e22dd8c604b"
          href="/"
        />
      </Col>
    </Row>
  );
}
