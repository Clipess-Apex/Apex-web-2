import React from 'react'
import Header from "../../../components/shared/AdminHeader";
import AdminDashboard from '../AdminDashboard';
import "../../../styles/adminModule/adminLayout/AdminLayoutDashboard.css";
import AdminSideBar from '../../../components/shared/AdminSideBar';

function AdminDashboardPage() {
  return (
    <>
      <div className="adminDashboard">
        <Header />
        <div className="mainContainer">
          <AdminSideBar />
          <div className="content-container">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboardPage;
