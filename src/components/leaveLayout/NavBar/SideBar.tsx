import React from 'react'
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../../Icons/shared/DashboardIcon.svg";
import InventoryIcon from "../../../Icons/shared/InventoryIcon.svg";
import AttendanceIcon from "../../../Icons/shared/AttendanceIcon.svg";
import WorkplanIcon from "../../../Icons/shared/WorkplanIcon.svg";
import LeaveIcon from "../../../Icons/shared/LeaveIcon.svg";
import SettingsIcon from "../../../Icons/shared/SettingsIcon.svg";
import LogoutIcon from "../../../Icons/shared/LogoutIcon.svg";
import './SideBar.css'

const lists = [
    { name: "Dashboard",path: "/", icon: <img src={DashboardIcon} alt="Dashboard Icon" /> },
    { name: "Inventory", path: "/inventorydashboard", icon: <img src={InventoryIcon} alt="Inventory Icon" /> },
    { name: "Attendance", path: "/timeEntry/employeeDashBoard", icon: <img src={AttendanceIcon} alt="Attendance Icon" /> },
    { name: "Workplan", path: "/contact", icon: <img src={WorkplanIcon} alt="Workplan Icon" /> },
    { name: "Leave", path: "/contact", icon: <img src={LeaveIcon} alt="Leave Icon" /> },
    { name: "Settings", path: "/contact", icon: <img src={SettingsIcon} alt="Settings Icon" /> },
    { name: "Logout", path: "/contact", icon: <img src={LogoutIcon} alt="Logout Icon" /> },
  ];

const SideBar = () => {
  return (
    <div className="sidebar">
      {lists.map((list, index) => (
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
    </div>
  )
}

export default SideBar