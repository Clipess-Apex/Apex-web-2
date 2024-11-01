import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import EmployeeInventoryDashboard from '../pages/EmployeeInventoryDashboard'

const EmployeeInventoryDashboardPage = () => {
  return (
    <>
      <div className="inventory">
        <Header/>
        <div className="mainContainer">
          <SideBar/>
          <div className="content-container">
            <EmployeeInventoryDashboard/>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeInventoryDashboardPage;