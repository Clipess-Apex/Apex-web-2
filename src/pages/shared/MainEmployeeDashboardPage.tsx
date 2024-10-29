import React from 'react'
import Header from '../../components/shared/Header'
import SideBar from '../../components/shared/SideBar'
import '../../styles/DashboardLayout/DashboardLayout.css'
import MainEmployeeDashboard from './MainEmployeeDashboard'

const MainEmployeeDashboardPage = () => {
  return (
    <>
      <div className="mainDashboard">
        <Header />
        <div className="mainContainer">
          <SideBar />
          <div className="content-container">
              <MainEmployeeDashboard />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainEmployeeDashboardPage