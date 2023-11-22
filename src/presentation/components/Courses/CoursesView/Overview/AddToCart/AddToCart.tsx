import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Courses/CoursesView/CoursesViewContext";
import { ICourse } from "domain/core/entities/courseEntity";
import IShoppingCartFailure from "domain/core/failures/shoppingCart/shoppingCartFailure";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { printLogError } from "presentation/logs/logs";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";
import { ShoppingCartRoutesEnum } from "presentation/routes/shoppingCartRoutes";
import { getNumberFormat } from "presentation/utils/intl/numberUtils";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";

interface IAddToCartProps {
  course: ICourse;
}

export default function AddToCart({ course }: IAddToCartProps) {
  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { addCourseToShoppingCart } = actions;
  const { loading, sucessful, error } = state.addCourseToShoppingCart;

  const router = useRouter();

  const [hasError, setHasError] = useState<IShoppingCartFailure | null>(null);

  const onAddCourseToShoppingCart = () => {
    const cookies = parseCookies();

    if (!cookies?.token) {
      router.push({
        pathname: AccountRoutesEnum.Signin,
        query: {
          redirectUrl: window.decodeURIComponent(
            window.location.origin + window.location.pathname
          ),
        },
      });
      return;
    }

    if (course.inShoppingCart) {
      router.push({
        pathname: ShoppingCartRoutesEnum.ShoppingCart,
      });
      return;
    }

    addCourseToShoppingCart({ courseId: course.courseId })(dispatch);
  };

  const handleAddCourseToShoppingCartSucessfull = useCallback(() => {
    router.push({
      pathname: ShoppingCartRoutesEnum.ShoppingCart,
    });
  }, [router]);

  const handleAddCourseToShoppingCartError = useCallback(() => {
    printLogError(error);
    setHasError(error);

    window.scrollTo(0, 0);
  }, [error]);

  useEffect(() => {
    if (sucessful) handleAddCourseToShoppingCartSucessfull();
  }, [sucessful, handleAddCourseToShoppingCartSucessfull]);

  useEffect(() => {
    if (error) handleAddCourseToShoppingCartError();
  }, [error, handleAddCourseToShoppingCartError]);

  return (
    <Row>
      {hasError && (
        <Alert variant="danger" className="mb-5">
          Algo no ha salido como se esperaba. Vuelve a intentarlo.
        </Alert>
      )}

      <Col lg={12} className="mb-3">
        <h2 className="text-primary">
          {getNumberFormat({ value: 65, style: "currency" })}
        </h2>
      </Col>

      <Col lg={12}>
        <Button
          variant="primary"
          onClick={() => onAddCourseToShoppingCart()}
          className="py-2 px-5"
          disabled={loading}
        >
          {loading ? (
            <Spinner
              animation="border"
              variant="light"
              className="spinner-border-light"
            />
          ) : course.inShoppingCart ? (
            "Agregado al carrito de compras"
          ) : (
            "Añadir al carrito de compras"
          )}
        </Button>
      </Col>
    </Row>
  );
}
