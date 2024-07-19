import React from 'react'
import Header from "../../../components/shared/AdminHeader";
import AdminSideBar from '../../../components/shared/AdminSideBar';
import EmployeeDetails from '../EmployeeDetails';
import "../../../styles/adminModule/adminLayout/AdminLayout.css";

const EmployeeDetailsPage = () => {
  return (
    <>
      <div className="admin">
        <Header />
        <div className="mainContainer">
          <AdminSideBar />
          <div className="content-container">
            <EmployeeDetails />
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeDetailsPage
