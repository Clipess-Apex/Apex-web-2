import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ManageEmployees from "../../icons/adminModule/Manageemployees.svg";
import RolesIcon from "../../icons/adminModule/roles.svg";
import DepartmentIcon from "../../icons/adminModule/Department.svg";
import EmployeetypesIcon from "../../icons/adminModule/Employeetypes.svg";
import "../../styles/adminModule/AdminDashboard.css";
import EmployeeStats from "../../components/adminModule/EmployeeStats";

interface CardProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  path: string;
}

const AdminCard: React.FC<CardProps> = ({ title, icon, path }) => {
  return (
    <div className="admin-card">
      <div className="admin-card-icon">{icon}</div>
      <h2 className="admin-card-title">{title}</h2>
    </div>
  );
};

const adminCardData = [
  {
    id: 1,
    title:(<>Manage<br />Employees</>),
    icon: (
      <img
        src={ManageEmployees}
        alt="Manage Employees"
        className="admin-card-icon"
      />
    ),
    path: "/EmployeeTable",
  },
  {
    id: 2,
    title: "Manage Departments",
    icon: (
      <img
        src={DepartmentIcon}
        alt="Manage Departments"
        className="admin-card-icon"
      />
    ),
    path: "/DepartmentTable",
  },
  {
    id: 3,
    title: "Manage Roles",
    icon: (
      <img src={RolesIcon} alt="Manage Roles" className="admin-card-icon" />
    ),
    path: "/RoleTable",
  },
  {
    id: 4,
    title: "Manage Employee Types",
    icon: (
      <img
        src={EmployeetypesIcon}
        alt="Manage Employee Types"
        className="admin-card-icon"
      />
    ),
    path: "/employeeTypeTable",
  },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">  
    <EmployeeStats />    
      <div className="admin-dashboard-card-container">      
        {adminCardData.map((card) => (
          <Link to={card.path} key={card.id} style={{ textDecoration: "none" }}>
            <AdminCard
              key={card.id}
              title={card.title}
              icon={card.icon}
              path={card.path}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
