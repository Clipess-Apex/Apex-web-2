import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import PendingLeaves from '../../../components/leaveComponents/LeaveCreateComponents/PendingLeaves'

const PendingLeavesLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <PendingLeaves/>
        </div>
      </div>
    </div>
  </>
  )
}

export default PendingLeavesLayout;