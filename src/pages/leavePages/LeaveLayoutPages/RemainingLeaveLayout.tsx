import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import RemainingLeaves from '../RemainingLeaves/RemainingLeaves'

const RemainingLeavesLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <RemainingLeaves/>
        </div>
      </div>
    </div>
  </>
  )
}

export default RemainingLeavesLayout;