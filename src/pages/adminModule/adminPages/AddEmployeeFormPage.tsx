import React from 'react'
import Header from "../../../components/shared/Header";
import AdminSideBar from '../../../components/shared/AdminSideBar';
import AddEmployeeForm from '../AddEmployeeForm';
import "../../../styles/adminModule/adminLayout/AdminLayout.css";


const AddEmployeeFormPage = () => {
  return (
    <>
      <div className="admin">
        <Header />
        <div className="mainContainer">
          <AdminSideBar />
          <div className="content-container">
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEmployeeFormPage
