import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/shared/AdminSidebar.css'
import { ReactComponent as Dashboard } from "../../icons/shared/navBar/DashboardIcon.svg";
import { ReactComponent as Inventory } from "../../icons/shared/navBar/InventoryIcon.svg";
import { ReactComponent as Attendance } from "../../icons/shared/navBar/AttendanceIcon.svg";
import { ReactComponent as Workplan } from "../../icons/shared/navBar/WorkplanIcon.svg";
import { ReactComponent as Leave } from "../../icons/shared/navBar/LeaveIcon.svg";
import { ReactComponent as Settings } from "../../icons/shared/navBar/SettingsIcon.svg";
import { ReactComponent as Logout } from "../../icons/shared/navBar/LogoutIcon.svg";
import { useAuth } from "../../providers/AuthContextProvider";

const lists = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <Dashboard /> },
    { name: "Employee", path: "/employeeTable", icon: <Inventory /> },
    { name: "Departments", path: "/departmentTable", icon: <Attendance /> },
    { name: "Roles", path: "/roleTable", icon: <Workplan /> },
    { name: "Employee Types", path: "/employeeTypeTable", icon: <Leave /> },
    { name: "Settings", path: "/contact", icon: <Settings /> },
  ];

const AdminSideBar = () => {
    const { logout } = useAuth();
    return (
      <div className="adminSidebar">
        {lists.map((list) => {
          return (
            <NavLink
              to={list.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {list.icon}
              {list.name}
            </NavLink>
          );
        })}
        <button className="Logout-button" onClick={logout}>
          <Logout /> Logout
        </button>
      </div>
    );
}

export default AdminSideBar