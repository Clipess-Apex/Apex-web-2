import React from 'react'
import Header from "../../../components/shared/AdminHeader";
import AdminSideBar from '../../../components/shared/AdminSideBar';
import RoleTable from '../lookupTables/RoleTable';
import "../../../styles/adminModule/adminLayout/AdminLayout.css";

const RoleTablePage = () => {
  return (
    <>
      <div className="admin">
        <Header />
        <div className="mainContainer">
          <AdminSideBar />
          <div className="content-container">
            <RoleTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default RoleTablePage
