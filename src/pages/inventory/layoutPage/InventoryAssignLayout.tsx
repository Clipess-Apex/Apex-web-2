import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import InventoryAssign from '../pages/InventoryAssign'

const InventoryAssignLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          < InventoryAssign />
        </div>
      </div>
    </div>
  </>
  )
}

export default InventoryAssignLayout
