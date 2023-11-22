import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";

export default function ErrorMessageNetwork() {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center px-3"
      style={{ height: "500px" }}
    >
      <Row>
        <Col lg={12} className="text-center">
          <span className="text-grey">
            No tienes conexión a Internet. Comprueba tu conexión y vuelve a
            intentarlo.
          </span>
        </Col>

        <Col lg={12} className="mt-4 text-center">
          <Button
            type="button"
            variant="primary"
            className="py-2 px-5"
            onClick={() => refreshData()}
          >
            Volver a intentar
          </Button>
        </Col>
      </Row>
    </div>
  );
}
