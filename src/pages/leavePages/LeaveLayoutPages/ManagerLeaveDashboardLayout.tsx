import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import LeaveManagerPage from '../../LeaveDashboard/LeaveManagerPage'

const ManagerLeaveDashboard = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <LeaveManagerPage/>
        </div>
      </div>
    </div>
  </>
  )
}

export default ManagerLeaveDashboard;