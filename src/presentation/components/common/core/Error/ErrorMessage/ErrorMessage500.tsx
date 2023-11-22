import Link from "next/link";
import { MainRoutesEnum } from "presentation/routes/mainRoutes";
import { Row, Col } from "react-bootstrap";

export default function ErrorMessage404() {
  return (
    <div
      className="d-flex align-items-center justify-content-center px-5"
      style={{ height: "500px" }}
    >
      <Row>
        <Col lg={12} className="text-center mb-4">
          <h2 className="text-primary">Algo no ha salido como se esperaba</h2>
        </Col>

        <hr />

        <Col lg={12} className="text-center mb-3 mt-4">
          <h3 className="text-grey">Los sentimos, algo no ha salido bien</h3>
        </Col>

        <Col lg={12} className="text-center">
          <p>
            Al parecer tenemos problemas con esta página. Te ayudarémos a
            regresar al inicio de {process.env.appName} y puedas continuar{" "}
            <br /> navegando por la plataforma.
          </p>
        </Col>

        <Col lg={12} className="mt-4 text-center">
          <Link
            href={{
              pathname: MainRoutesEnum.Init,
            }}
          >
            <a className="btn btn-primary py-2 px-5">
              Ir al inicio de {process.env.appName}
            </a>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
