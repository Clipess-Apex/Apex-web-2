import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import InventoryDashboard from '../pages/InventoryDashboard'

const InventoryDashboardLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <InventoryDashboard/>
        </div>
      </div>
    </div>
  </>
  )
}

export default InventoryDashboardLayout
