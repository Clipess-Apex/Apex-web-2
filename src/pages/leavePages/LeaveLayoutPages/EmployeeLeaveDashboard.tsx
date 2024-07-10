import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import EmployeeLeavePage from '../../LeaveDashboard/LeaveEmployeePage'

const EmployeeLeaveDashboardLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <EmployeeLeavePage/>
        </div>
      </div>
    </div>
  </>
  )
}

export default EmployeeLeaveDashboardLayout;