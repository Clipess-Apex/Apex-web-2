import React, { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { getNotifications } from "../../services/workPlan/NotificationServices";

import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../providers/AuthContextProvider";

interface StoredUser {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

const Notifications: React.FC = () => {
  const [Tasknotifications, setTaskNotifications] = useState<string[]>([]);
  const [ TasknotificationCount, setTaskNotificationCount ] = useState<number>(0);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [badgeContent, setBadgeContent] = useState(0);
  const [EmployeeId, setEmployeeId] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); // Parse storedUser as StoredUser type
      setEmployeeId(parsedUser.EmployeeID)
      console.log("Employee id in daily time netry is",EmployeeId)
      console.log("Header Parsed user is",parsedUser.EmployeeID)
    }
  },[])

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
            setTaskNotifications((notificationText) => [
              ...notificationText,
              receivedNotifications,
            ]);
            setTaskNotificationCount(Tasknotifications.length);
          });
        })
        .catch((error) => console.error("SignalR Connection Error:", error));
    }
  }, [connection, EmployeeId]);

  useEffect(() => {
    async function fetchTaskNotifications() {
      try {
        const data = await getNotifications(EmployeeId);
        setTaskNotifications(data);
        console.log(data);
        setTaskNotificationCount(Tasknotifications.length);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchTaskNotifications();
  }, []);

  return (
    <div>
      <div className="worplan">
      <ul className="list-group">
        {Tasknotifications.map((notification, index) => (
          <li key={index} className="list-group-item notification-text">
            <p>{notification}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Notifications;
