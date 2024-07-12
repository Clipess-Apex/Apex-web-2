import React, { useState } from 'react';
import axios from 'axios';
import './InventoryNotification.css'

interface InventoryNotificationProps {
  userNotificationId: number;
  employeeId: number;
  notification: string;
  IsRead: boolean;
}

const InventoryNotification: React.FC<InventoryNotificationProps> = ({ userNotificationId, notification, IsRead }) => {
  const [isRead, setIsRead] = useState(IsRead);

  const handleInventoryRead = async () => {
    try {
      const res = await axios.put(`https://localhost:7166/api/InventoryNotification/read/${userNotificationId}`, {
        isRead: true,
        notification: '',
      });
      if (res.status === 200) {
        setIsRead(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='inventory-notification-container'>
        <p className='inventory-notification-text'> {notification} </p>
        <div className="notification-button-container">
        <button className='inventory-notification-button' onClick={handleInventoryRead}>Hide</button>
        </div>
    </div>
  );
};

export default InventoryNotification;
