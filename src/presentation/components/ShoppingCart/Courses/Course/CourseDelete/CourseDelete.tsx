import {
  IShoppingCartContext,
  ShoppingCartContext,
} from "application/context/ShoppingCart/ShoppingCartContext";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { useRouter } from "next/router";
import { printLogError } from "presentation/logs/logs";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";

interface ICourseDeleteProps {
  courseId: string;
}

export default function CourseDelete({ courseId }: ICourseDeleteProps) {
  const { state, actions, dispatch } =
    useContext<IShoppingCartContext>(ShoppingCartContext);
  const { removeCourseToShoppingCart } = actions;
  const { loading, sucessful, error } = state.removeCourseToShoppingCart;

  const router = useRouter();

  const [hasError, setHasError] = useState<IShoppingCartFailure | null>(null);

  const handleRemoveCourseToShoppingCartSucessfull = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  const handleRemoveCourseToShoppingCartError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleRemoveCourseToShoppingCartSucessfull();
  }, [sucessful, handleRemoveCourseToShoppingCartSucessfull]);

  useEffect(() => {
    if (error) handleRemoveCourseToShoppingCartError();
  }, [error, handleRemoveCourseToShoppingCartError]);

  return (
    <Row>
      {hasError && (
        <Alert variant="danger" className="mb-5">
          Algo ha salido mal. Vuelve a intentarlo.
        </Alert>
      )}

      <Col lg={12}>
        <Button
          variant="link"
          onClick={() =>
            removeCourseToShoppingCart({ courseId: courseId })(dispatch)
          }
          disabled={loading}
          className="py-0 px-0"
        >
          <div className="d-flex">
            <div className="me-2">
              <i
                className="fa-solid fa-trash icon-danger"
                style={{ fontSize: "20px" }}
              />
            </div>

            <div>
              <p className="text-danger">Eliminar</p>
            </div>
          </div>
        </Button>
      </Col>
    </Row>
  );
}
