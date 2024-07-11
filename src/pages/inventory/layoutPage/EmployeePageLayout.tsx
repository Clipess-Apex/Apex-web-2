import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import EmployeePage from '../pages/EmployeePage'

const EmployeeAttendanceEntryPage = () => {
  return (
    <>
      <div className="inventory">
        <Header/>
        <div className="mainContainer">
          <SideBar/>
          <div className="content-container">
            <EmployeePage/>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeAttendanceEntryPage