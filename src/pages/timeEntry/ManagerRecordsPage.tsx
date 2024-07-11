import React, { useState } from 'react'
import '../../styles/timeEntry/pages/ManagerRecordsPage.css'
import ManagerMonthlyCalendar from '../../components/timeEntry/ManagerRecords/ManagerMonthlyCalendar'
import ManagerDailyCalendar from '../../components/timeEntry/ManagerRecords/ManagerDailyCalendar'
import Header from '../../components/shared/AdminHeader'
import SideBar from '../../components/shared/SideBar'



const ManagerRecordsPage = () => {

  const [selectedView, setSelectedView] = useState('daily');

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  return (
    <>
      <div className="managerRecordsPage">
        <Header />
        <div className="mainContainer">
          <SideBar />
          <div className="content-container">
            <div className='topic'>
              <p onClick={() => handleViewChange('daily')} className={selectedView === 'daily' ? 'active' : ''}>Daily Records</p>
              <p onClick={() => handleViewChange('monthly')} className={selectedView === 'monthly' ? 'active' : ''}>Monthly Records</p>
            </div>
            {selectedView === 'daily' && <ManagerDailyCalendar />}
            {selectedView === 'monthly' && <ManagerMonthlyCalendar />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagerRecordsPage