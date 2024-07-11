import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import EmployeeRequest from '../pages/EmployeeRequest'

const EmployeeRequestLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <EmployeeRequest />
        </div>
      </div>
    </div>
  </>
  )
}

export default EmployeeRequestLayout;
