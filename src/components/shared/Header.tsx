import React,{useEffect, useState, useRef} from "react";
import "../../styles/shared/Header.css";
import LogoIcon from "../../icons/shared/header/logo.png"
import NotificationIcon from '../../icons/shared/header/notifications-2.svg';
import { useAuth } from "../../providers/AuthContextProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TimeEntryNotifications from './TimeEntryNotifications'
import InventoryNotifications from './InventoryNotification';

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

interface TimeEntryNotification {
  type: "timeEntry";
  id:number,
  month : string,
  message : string,
  createdDate : string
}

interface LeaveNotification {
  type: "leave";
  EmployeeID: string;
  message: string;
  CreatedAt: Date;
}

interface InventoryNotification {
  type: "inventory";
  userNotificationId: number;
  employeeId: number;
  notification: string;
  IsRead: boolean;
}


type Notification = TimeEntryNotification | LeaveNotification | InventoryNotification;

interface StoredUser {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: string;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}


const Header = () => {

 

  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  const [notifications, setNotifications] = useState<Notification[] >([])

  const Employee = useRef<StoredUser | null>(null); // Ref for storing user data

  // let user: DecodedToken | null = null;

  // if (token) {
  //   user = jwtDecode<DecodedToken>(token);
  //   console.log("Decoded token in Header:", user);
  // }

  // const tokenEmployeeID = user ? user.EmployeeID : undefined;

  // const employeeId = useMemo(() => tokenEmployeeID, [])
  // const [employeeId,setEmployeeId] = useState<number| undefined>(tokenEmployeeID);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); // Parse storedUser as StoredUser type
      Employee.current = parsedUser;
      console.log("Current ref user is",Employee.current )
      console.log("Header Parsed user is",parsedUser.EmployeeID)
    }
  },[])

  const handleChipClick = () => {
    console.log("user in the header temp", user)
    if (user) {
      console.log("Header",user)
      navigate(`/user-profile/${user.EmployeeID}`);
    }
  };

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    fetchNotifications();
  
  },[])

  const fetchNotifications = async () => {
    const timeEntryResponse = await fetch(`https://localhost:7166/api/attendanceNotification/GetTimeEntryNotification?employeeId=${Employee.current?.EmployeeID}`);
    const inventoryResponse = await fetch(`https://localhost:7166/api/InventoryNotification/getInventoryNotification/${Employee.current?.EmployeeID}`);
   
    const timeEntryNotification: TimeEntryNotification[] = await timeEntryResponse.json();
    const inventoryNotification: InventoryNotification[] = await inventoryResponse.json();
    console.log("timeEntryNotification is ",timeEntryNotification)

    setNotifications([
      ...timeEntryNotification.map( notif => ({...notif, type: "timeEntry" as const})),
      ...inventoryNotification.map( notif => ({...notif, type: "inventory" as const}))
    ]);
  };

  

  const notificationCount = notifications.length;

  return (
    <div className="header">
      <div className="logo">
        <img src={LogoIcon} />
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
                  <div className="notification-item">
                    {notification.type == "timeEntry" && (
                      <TimeEntryNotifications 
                          id={notification.id}
                          message={notification.message}
                          date={notification.createdDate} />
                    )}
                     {notification.type === "inventory" && (
                         <InventoryNotifications 
                          userNotificationId={notification.userNotificationId}
                          notification={notification.notification}
                          employeeId={notification.employeeId} 
                          IsRead={notification.IsRead}
                          />
                      )}
                  </div>
                ))
              ) : (
                <div className="no-notifications">No notifications</div>
              )}
            </div>
          )}
        </div>
        <div
          className="chip"
          onClick={handleChipClick}
          style={{ cursor: "pointer" }}
        >
          {user ? (
            <>
              <img
                src={user.ImageUrl}
                alt="Profile"
                width="96px"
                height="96px"
              />
              {user.FirstName} {user.FirstName}
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
