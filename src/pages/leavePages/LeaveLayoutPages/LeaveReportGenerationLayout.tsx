import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import LeaveReportGeneration from '../LeaveReports/LeaveReportsGeneration'

const LeaveReportGenerationLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <LeaveReportGeneration/>
        </div>
      </div>
    </div>
  </>
  )
}

export default LeaveReportGenerationLayout;