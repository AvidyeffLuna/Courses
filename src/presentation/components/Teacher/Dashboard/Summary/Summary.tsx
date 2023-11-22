import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import {
  DashboardContext,
  IDashboardContext,
} from "application/context/Teacher/Dashboard/DashboardContext";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function Summary() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: teacher } = authState.teacher;

  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getCoursesQuantity } = actions;
  const { data, loading, sucessful, error } = state.courses;

  const getCoursesDispatch = useCallback(() => {
    getCoursesQuantity({
      teacherId: teacher?.teacherId,
    })(dispatch);
  }, [dispatch, getCoursesQuantity, teacher?.teacherId]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup && teacher) getCoursesDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getCoursesDispatch, teacher]);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage retry={getCoursesDispatch} />;

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="me-5">
                <i
                  className="fa-solid fa-book-open icon-primary"
                  style={{ fontSize: "30px" }}
                />
              </div>

              <div>
                <div className="mb-3">
                  <h4>Cursos listados</h4>
                </div>

                <div>
                  <h3 className="text-primary">{data}</h3>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
