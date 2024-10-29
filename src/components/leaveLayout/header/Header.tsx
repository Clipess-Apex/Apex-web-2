import React, { useState, useEffect } from 'react';
import LogoIcon from '../../../Icons/shared/logo.png';
import NotificationIcon from '../../../Icons/shared/NotificationIcon.svg';
import ProfileIcon from '../../../Icons/shared/ProfileIcon.svg';
import './Header.css';
import { getUnreadNotificationsForManager } from '../../../services/LeaveNotificationServices';

const Header: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const managerId = 4; // Replace with actual manager ID

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getUnreadNotificationsForManager(managerId);
      setNotificationCount(notifications.length);
    };

    fetchNotifications();
  }, [managerId]);

  return (
    <div className="header">
      <div className="logo">
        <img src={LogoIcon} alt="Logo" />
        <div className="logoTitle">Clipess</div>
      </div>
      <div className="title">
        <div className="notification">
          <img src={NotificationIcon} alt="Notification Icon" />
          {notificationCount > 0 && (
            <div className="notification-count">{notificationCount}</div>
          )}
        </div>
        <div className="ProfileIcon">
          <img src={ProfileIcon} alt="Profile Icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
