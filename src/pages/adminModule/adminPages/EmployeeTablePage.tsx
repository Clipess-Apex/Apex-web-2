import React from 'react'
import Header from "../../../components/shared/AdminHeader";
import AdminSideBar from '../../../components/shared/AdminSideBar';
import EmployeeTable from '../EmployeeTable';
import "../../../styles/adminModule/adminLayout/AdminLayout.css";

function EmployeeTablePage() {
  return (
    <>
      <div className="admin">
        <Header />
        <div className="mainContainer">
          <AdminSideBar />
          <div className="content-container">
            <EmployeeTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeTablePage
