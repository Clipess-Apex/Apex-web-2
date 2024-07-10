import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'
import CompanyLeaveHistory from '../../../components/leaveComponents/CompanyLeaveHistory/CompanyLeaveHistory'

const CompanyLeaveHistoryLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <CompanyLeaveHistory/>
        </div>
      </div>
    </div>
  </>
  )
}

export default CompanyLeaveHistoryLayout;