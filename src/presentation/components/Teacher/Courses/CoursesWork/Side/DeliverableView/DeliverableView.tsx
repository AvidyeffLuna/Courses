import { useRouter } from "next/router";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import DeliverableDescription from "./DeliverableDescription/DeliverableDescription";
import DeliverableTitle from "./DeliverableTitle/DeliverableTitle";
import DeliverablePictures from "./DeliverablePictures/DeliverablePictures";
import DeliverableDocuments from "./DeliverableDocuments/DeliverableDocuments";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Teacher/Courses/CoursesWork/CoursesWorkContext";

export default function DeliverableView() {
  const { state, actions, dispatch } =
    useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { getDeliverableById } = actions;
  const {
    data: deliverable,
    loading,
    sucessful,
    error,
  } = state.deliverableState;

  const router = useRouter();

  const getDeliverableByIdDispatch = useCallback(() => {
    getDeliverableById({ deliverableId: router.query.deliverable ?? "" })(
      dispatch
    );
  }, [dispatch, getDeliverableById, router.query.deliverable]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getDeliverableByIdDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getDeliverableByIdDispatch, router.query.deliverable]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="mt-5">
        <ErrorMessage retry={getDeliverableByIdDispatch} />
      </div>
    );

  if (!deliverable.deliverableId && sucessful) {
    return (
      <div className="mt-5">
        <ErrorEmptyMessage
          title="No se ha encontrado la entrega o respuesta"
          description="No hemos podido encontrar la entrega o respuesta, puede que haya sido eliminado"
          retry={getDeliverableByIdDispatch}
        />
      </div>
    );
  }

  if (!deliverable.deliverableId && !sucessful) {
    <div className="mt-5">
      <ErrorMessage
        title="Algo no ha salido como se esperaba"
        description="Algo ha salido mal al intentar obtener la entrega o respuesta. Intentalo nuevamente."
        retry={getDeliverableByIdDispatch}
      />
    </div>;
  }

  return (
    <Row>
      <Col lg={12} className="mb-4">
        <DeliverableTitle title={deliverable.title} />
      </Col>

      <Col lg={12} className="mb-4">
        <DeliverableDescription description={deliverable.description} />
      </Col>

      {deliverable.mediaList && deliverable.mediaList.length > 0 && (
        <>
          <Col lg={12} className="d-flex mb-4">
            <DeliverablePictures
              mediaList={deliverable.mediaList.filter(
                (mediaFilter) => mediaFilter.type === "image"
              )}
            />
          </Col>

          <Col lg={12} className="d-flex mb-4">
            <DeliverableDocuments
              mediaList={deliverable.mediaList.filter(
                (mediaFilter) => mediaFilter.type === "document"
              )}
            />
          </Col>
        </>
      )}
    </Row>
  );
}
