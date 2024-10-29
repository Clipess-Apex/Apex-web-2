import React, { useState } from 'react'
import '../../styles/timeEntry/pages/EmployeeRecordsPage.css'
import EmployeeDailyCalendar from '../../components/timeEntry/EmployeeRecords/EmployeeDailyCalendar'
import EmployeeMonthlyCalendar from '../../components/timeEntry/EmployeeRecords/EmployeeMonthlyCalendar'
import EmployeePdfViewerCalendar from '../../components/timeEntry/EmployeeRecords/EmployeePdfViewerCalendar'
import Header from '../../components/shared/Header'
import SideBar from '../../components/shared/SideBar'

const EmployeeRecordsPage = () => {

  const [selectedView, setSelectedView] = useState('daily');

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  return (
    <>
      <div className="EmployeeRecordsPage">
        <Header />
        <div className="mainContainer">
          <SideBar />

          <div className="content-container">
            <div className='topic'>
              <p onClick={() => handleViewChange('daily')} className={selectedView === 'daily' ? 'active' : ''}>Daily Records</p>
              <p onClick={() => handleViewChange('monthly')} className={selectedView === 'monthly' ? 'active' : ''}>Monthly Records</p>
              <p onClick={() => handleViewChange('employeePDF')} className={selectedView === 'employeePDF' ? 'active' : ''}>View & Download Monthly PDF</p>
            </div>
            {selectedView === 'daily' && <EmployeeDailyCalendar />}
            {selectedView === 'monthly' && <EmployeeMonthlyCalendar />}
            {selectedView === 'employeePDF' && <EmployeePdfViewerCalendar />}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeRecordsPage