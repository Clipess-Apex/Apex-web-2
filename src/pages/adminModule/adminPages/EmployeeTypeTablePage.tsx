import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import AdminSideBar from '../../../components/shared/AdminSideBar';
import EmployeeTypeTable from '../lookupTables/EmployeeTypeTable';

const EmployeeTypeTablePage = () => {
  return (
    <>
      <div className="admin">
      <Header/>
      <div className="mainContainer">
        <AdminSideBar/>
        <div className="content-container">
          <EmployeeTypeTable/>
        </div>
      </div>
    </div>
    </>
  )
}

export default  EmployeeTypeTablePage;
