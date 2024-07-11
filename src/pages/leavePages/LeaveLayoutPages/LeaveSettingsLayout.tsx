import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import LeaveSettingDashboard from '../LeaveSettings/LeaveSettingsDashboard'

const LeaveSettingsLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <LeaveSettingDashboard/>
        </div>
      </div>
    </div>
  </>
  )
}

export default LeaveSettingsLayout;