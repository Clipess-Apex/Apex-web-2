import React, { useEffect, useState } from "react";
import "./LeaveNotification.css";
import { useNavigate } from "react-router-dom";

interface NotificationProps {
  id: number;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({id,message}) => {

  const navigate = useNavigate();


  const handleNotificationItemClick = () => {
    navigate(`/leave/manager/manage-leave`);
  };

  return (
    
              <div key={id} onClick={() => handleNotificationItemClick()}>
                {message}
              </div>

  );
};

export default Notification;
