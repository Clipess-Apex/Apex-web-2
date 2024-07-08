import React from "react";
import Header from "../../../components/shared/Header";
import AdminSideBar from '../../../components/shared/AdminSideBar';
import DepartmentTable from "../lookupTables/DepartmentTable";
import "../../../styles/adminModule/adminLayout/AdminLayout.css";

const DepartmentTablePage = () => {
  return (
    <>
      <div className="admin">
        <Header />
        <div className="mainContainer">
          <AdminSideBar />
          <div className="content-container">
            <DepartmentTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentTablePage;
