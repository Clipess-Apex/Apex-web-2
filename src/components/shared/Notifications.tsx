import React, { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { getNotifications } from "../../services/workPlan/NotificationServices";
import { useNotificationContext } from "../../providers/NotificationContext";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const { notificationCount, setNotificationCount } = useNotificationContext();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [badgeContent, setBadgeContent] = useState(0);
  let EmployeeId: number = 4;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7166/signalServer?userId=" + EmployeeId)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("RecieveNotification", (receivedNotifications) => {
            setNotifications((notificationText) => [
              ...notificationText,
              receivedNotifications,
            ]);
            setNotificationCount(Notifications.length);
          });
        })
        .catch((error) => console.error("SignalR Connection Error:", error));
    }
  }, [connection, EmployeeId]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getNotifications(EmployeeId);
        setNotifications(data);
        console.log(data);
        setNotificationCount(notifications.length);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <div>
      <ul className="list-group">
        {notifications.map((notification, index) => (
          <li key={index} className="list-group-item notification-text">
            <p>{notification}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
