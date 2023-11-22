import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { IDeliverable } from "domain/core/entities/deliverableEntity";

import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DeliverableCard from "./DeliverableCard/DeliverableCard";

export default function Deliverables() {
  const router = useRouter();

  const { state, actions, dispatch } =
    useContext<ICoursesViewContext>(CoursesViewContext);
  const { getDeliverables } = actions;
  const { data: course } = state.course;
  const { data, loading, sucessful, error, limit } = state.deliverables;

  const [deliverables, setDeliverables] = useState<IDeliverable[]>([]);

  const getDeliverablesDispatch = useCallback(() => {
    getDeliverables({
      courseId: course.courseId,
      status: router.query?.status ? router.query.status.toString() : null,
      page: router.query?.page ? parseInt(router.query.page.toString()) : 1,
      limit,
    })(dispatch);
  }, [
    course.courseId,
    dispatch,
    getDeliverables,
    limit,
    router.query.page,
    router.query.status,
  ]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getDeliverablesDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getDeliverablesDispatch]);

  const handleCoursesSucessful = useCallback(() => {
    setDeliverables(data);
  }, [data]);

  useEffect(() => {
    if (sucessful) handleCoursesSucessful();
  }, [data, sucessful, handleCoursesSucessful]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getDeliverablesDispatch} />;

  if (deliverables.length === 0 && !sucessful) return <div />;

  if (deliverables.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado entregas"
        description="El curso no posee entregas actualmente"
        retry={getDeliverablesDispatch}
      />
    );
  }

  return (
    <Row>
      {deliverables.map((deliverable: IDeliverable) => (
        <Col key={deliverable.deliverableId} lg={12} className="mb-5">
          <DeliverableCard deliverable={deliverable} />
        </Col>
      ))}

      <Col lg={12} className="d-flex justify-content-end">
        <Paginate
          page={router.query?.page ? router.query.page.toString() : "1"}
          limit={limit}
          total={0}
        />
      </Col>
    </Row>
  );
}
