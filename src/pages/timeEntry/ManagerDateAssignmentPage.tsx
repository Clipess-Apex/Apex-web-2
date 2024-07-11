import React, { useState } from 'react'
import '../../styles/timeEntry/pages/ManagerDateAssignmentPage.css'
import CurrentMonthDateUpdateContainer from '../../components/timeEntry/ManagerDateAssignment/CurrentMonthDateUpdateContainer'
import NextMonthDateDefineContainer from '../../components/timeEntry/ManagerDateAssignment/NextMonthDateDefineContainer'
import Header from '../../components/shared/AdminHeader'
import SideBar from '../../components/shared/SideBar'

const ManagerDateAssignmentPage = () => {

  const [selectedView, setSelectedView] = useState('nextMonth');

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  return (
    <>
      <div className="ManagerDateAssignmentPage">
        <Header />
        <div className="mainContainer">
          <SideBar />
          <div className="content-container">
            <div className="topic">
              <p onClick={() => handleViewChange('nextMonth')} className={selectedView === 'nextMonth' ? 'active' : ''}>Create Next Month Records</p>
              <p onClick={() => handleViewChange('currentMonth')} className={selectedView === 'currentMonth' ? 'active' : ''}>Update Current Month Records</p>
            </div>
            {selectedView === 'nextMonth' && <NextMonthDateDefineContainer />}
            {selectedView === 'currentMonth' && <CurrentMonthDateUpdateContainer />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagerDateAssignmentPage