import React from 'react'
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../icons/shared/navBar/DashboardIcon.svg";
import InventoryIcon from "../../icons/shared/navBar/InventoryIcon.svg";
import AttendanceIcon from "../../icons/shared/navBar/AttendanceIcon.svg";
import WorkplanIcon from "../../icons/shared/navBar/WorkplanIcon.svg";
import LeaveIcon from "../../icons/shared/navBar/LeaveIcon.svg";
import SettingsIcon from "../../icons/shared/navBar/SettingsIcon.svg";
import {ReactComponent as LogoutIcon} from "../../icons/shared/navBar/LogoutIcon.svg";
import '../../styles/shared/SideBar.css'
import { useAuth } from "../../providers/AuthContextProvider";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

/* set your manager dashboard Link */
const managerSideBar = [
    { name: "Dashboard",path: "/primary-ManagerDashboardPage", icon: <img src={DashboardIcon} alt="Dashboard Icon" /> },
    { name: "Inventory", path: "/inventory/manager", icon: <img src={InventoryIcon} alt="Inventory Icon" /> },
    { name: "Attendance", path: "/timeEntry/manager", icon: <img src={AttendanceIcon} alt="Attendance Icon" /> },
    { name: "Workplan", path: "/workplan/manager", icon: <img src={WorkplanIcon} alt="Workplan Icon" /> },
    { name: "Leave", path: "/leave/manager", icon: <img src={LeaveIcon} alt="Leave Icon" /> },
    { name: "Settings", path: "/contact", icon: <img src={SettingsIcon} alt="Settings Icon" /> },
  ];

  /* set your employe dashboard Link */
  const employeeSideBar = [
    { name: "Dashboard",path: "/primary-EmployeeDashboardPage", icon: <img src={DashboardIcon} alt="Dashboard Icon" /> },
    { name: "Inventory", path: "/inventory/employee", icon: <img src={InventoryIcon} alt="Inventory Icon" /> },
    { name: "Attendance", path: "/timeEntry/employee", icon: <img src={AttendanceIcon} alt="Attendance Icon" /> },
    { name: "Workplan", path: "/workplan/employee", icon: <img src={WorkplanIcon} alt="Workplan Icon" /> },
    { name: "Leave", path: "/leave/employee", icon: <img src={LeaveIcon} alt="Leave Icon" /> },
    { name: "Settings", path: "/contact", icon: <img src={SettingsIcon} alt="Settings Icon" /> },
  ];

const SideBar = () => {

  const { token } = useAuth();
  const { logout } = useAuth();

let decodedToken: DecodedToken | null = null;

if (token) {
  decodedToken = jwtDecode<DecodedToken>(token);
  console.log("Decoded token inside sideBar:", decodedToken);
}


const userRole = decodedToken
? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
: null;



const normalizedUserRole = userRole?.toLowerCase();

let sideBarItems = undefined;

switch (normalizedUserRole) {
  case "manager":
    sideBarItems = managerSideBar;
    break;
  case "employee":
     sideBarItems = employeeSideBar;
    break;
}



  return (
    <div className="mainSidebar">
      {sideBarItems?.map((list, index) => (
        <NavLink
          key={index}
          to={list.path}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          {list.icon}
          {list.name}
        </NavLink>
      ))}
       <button className="Logout-button" onClick={logout}>
          <LogoutIcon /> Logout
        </button>
    </div>
  );
};

export default SideBar;
