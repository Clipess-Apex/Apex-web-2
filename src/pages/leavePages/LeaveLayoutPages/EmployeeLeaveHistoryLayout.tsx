import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import EmployeeLeaveHistory from '../../../components/leaveComponents/EmployeeLeaveHistory/EmployeeLeaveHistory'

const EmployeeLeaveHistoryLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <EmployeeLeaveHistory/>
        </div>
      </div>
    </div>
  </>
  )
}

export default EmployeeLeaveHistoryLayout;