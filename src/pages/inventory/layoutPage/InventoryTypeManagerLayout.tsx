import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'

import InventoryTypeManager from '../pages/InventoryTypeManager'

const InventoryTypeManagerLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <InventoryTypeManager/>
        </div>
      </div>
    </div>
  </>
  )
}

export default InventoryTypeManagerLayout
