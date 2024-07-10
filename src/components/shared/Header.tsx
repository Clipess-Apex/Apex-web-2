import React, { useState } from "react";
import "../../styles/shared/Header.css";
import LogoIcon from "../../icons/shared/header/logo.png";
import NotificationIcon from '../../icons/shared/header/notifications-2.svg';
import { useAuth } from "../../providers/AuthContextProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: string;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

const Header = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let decodedToken: DecodedToken | null = null;

  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded token:", decodedToken);
  }

  const handleChipClick = () => {
    if (decodedToken) {
      navigate(`/user-profile/${decodedToken.EmployeeID}`);
    }
  };

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const notifications = [
    { id: 1, message: "New leave request from John Doe" },
    { id: 2, message: "Leave request approved" },
    // Add more notifications here or fetch from an API
  ];

  const notificationCount = notifications.length;

  return (
    <div className="header">
      <div className="logo">
        <img src={LogoIcon} alt="Logo" />
        <div className="logoTitle">Clipess</div>
      </div>
      <div className="title">
      <div className="notification-icon" onClick={handleNotificationClick}>
          <img src={NotificationIcon} alt="Notifications" />
          {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
          {isDropdownOpen && (
            <div className="notification-dropdown">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    {notification.message}
                  </div>
                ))
              ) : (
                <div className="no-notifications">No notifications</div>
              )}
            </div>
          )}
        </div>
        <div className="chip" onClick={handleChipClick} style={{ cursor: "pointer" }}>
          {decodedToken ? (
            <>
              <img src={decodedToken.ImageUrl} alt="Profile" width="96px" height="96px" />
              {decodedToken.FirstName} {decodedToken.LastName}
            </>
          ) : (
            "No token available"
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Header;
