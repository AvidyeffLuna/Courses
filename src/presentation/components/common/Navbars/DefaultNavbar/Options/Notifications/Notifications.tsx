import NotificationsProvider from "application/context/Notifications/NotificationsContext";
import {
  CLUSTER_NAME,
  DATABASE_NAME,
  getCurrentUser,
} from "infrastructure/config/mongo-realm/app";
import { printLogError } from "presentation/logs/logs";
import { useCallback, useEffect, useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import NotificationsMenu from "./NotificationsMenu/NotificationsMenu";

export default function Notifications() {
  const [notificationsCount, setNotificationsCount] = useState(0);

  const onWatchNotificationsList = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();

      const mongo = currentUser.mongoClient(CLUSTER_NAME);
      const collection = mongo.db(DATABASE_NAME).collection("Notifications");

      const notificationsTotal = await collection.count({
        userId: currentUser.id,
        readAt: null,
      });

      setNotificationsCount(notificationsTotal);

      for await (const change of collection.watch({
        userId: currentUser.id,
        readAt: null,
      })) {
        let breakAsyncIterator = false;
        switch (change.operationType) {
          case "insert": {
            setNotificationsCount(notificationsCount + 1);

            breakAsyncIterator = true;
            break;
          }

          case "update": {
            setNotificationsCount(notificationsCount - 1);

            breakAsyncIterator = true;
            break;
          }
        }
        if (breakAsyncIterator) break;
      }
    } catch (error) {
      printLogError(error);
    }
  }, [notificationsCount]);

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) onWatchNotificationsList();

    return () => {
      isCleanup = false;
    };
  }, [onWatchNotificationsList]);

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="icon"
        className="dropdown-toggle--not btn btn-icon btn-indicator py-1 px-1"
        id="dropdown-options"
        style={{ border: "1px solid transparent", float: "right" }}
      >
        <i className="fa-solid fa-bell icon-primary" />

        {notificationsCount > 0 && (
          <Badge bg="primary" className="badge-indicator badge-xs py-1">
            {notificationsCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "450px" }}>
        <NotificationsProvider>
          <NotificationsMenu />
        </NotificationsProvider>
      </Dropdown.Menu>
    </Dropdown>
  );
}
