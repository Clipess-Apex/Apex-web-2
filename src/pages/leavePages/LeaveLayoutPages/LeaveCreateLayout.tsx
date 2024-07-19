import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import LeaveForm from '../../../components/leaveComponents/LeaveCreateComponents/LeaveCreateForm'

const LeaveCreateLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <LeaveForm/>
        </div>
      </div>
    </div>
  </>
  )
}

export default LeaveCreateLayout;