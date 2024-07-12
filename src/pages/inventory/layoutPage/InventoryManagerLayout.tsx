import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import InventoryManager from '../pages/InventoryManager'

const InventoryManagerLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <InventoryManager/>
        </div>
      </div>
    </div>
  </>
  )
}

export default InventoryManagerLayout
