import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import HandleLeavePage from '../../../components/leaveComponents/HandleLeaveComponents/HandlePendingLeaves'

const HandleLeave = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <HandleLeavePage/>
        </div>
      </div>
    </div>
  </>
  )
}

export default HandleLeave;