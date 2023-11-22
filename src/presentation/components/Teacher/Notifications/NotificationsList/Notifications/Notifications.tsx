import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import {
  INotificationsContext,
  NotificationsContext,
} from "application/context/Teacher/Notifications/NotificationsContext";
import { INotification } from "domain/core/entities/notificationEntity";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Loading from "presentation/components/common/core/Loading/Loading";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Notification from "./Notification/Notification";

export default function Notifications() {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const {
    data: teacher,
    loading: authLoading,
    error: authError,
  } = authState.teacher;

  const { state, actions, dispatch } =
    useContext<INotificationsContext>(NotificationsContext);
  const { getNotifications, readNotifications } = actions;
  const { data, loading, sucessful, error } = state.notificationsState;

  const [notifications, setNotifications] = useState<INotification[]>([]);

  const getNotificationsDispatch = useCallback(() => {
    getNotifications({
      teacherId: teacher?.teacherId,
    })(dispatch);
  }, [dispatch, getNotifications, teacher]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup && teacher) getNotificationsDispatch();

    return () => {
      isCleanup = false;
    };
  }, [getNotificationsDispatch, teacher]);

  useEffect(() => {
    if (sucessful) {
      setNotifications(data);
      readNotifications()(dispatch);
    }
  }, [data, dispatch, readNotifications, sucessful]);

  if (loading || authLoading) return <Loading />;

  if (error || authError)
    return <ErrorMessage retry={getNotificationsDispatch} />;

  if (notifications.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado notificaciones"
        description="En estos momentos no posees notificaciones"
        retry={getNotificationsDispatch}
      />
    );
  }

  return (
    <Row>
      {notifications.map((notification: INotification) => (
        <Col key={notification.notificationId} lg={12} className="mb-4">
          <Notification notification={notification} />
        </Col>
      ))}
    </Row>
  );
}
