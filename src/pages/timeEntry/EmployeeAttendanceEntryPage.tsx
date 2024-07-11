import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from '../../components/shared/AdminHeader'
import SideBar from '../../components/shared/SideBar'
import TimeEntryContainer from '../../components/timeEntry/EmployeeAtendanceEntry/TimeEntryContainer'
import '../../styles/timeEntry/pages/EmployeeAttendanceEntryPage.css'

const EmployeeAttendanceEntryPage = () => {
  return (
    <>
      <div className="EmployeeAttendanceEntryPage">
        <Header />
        <div className="mainContainer">
          <SideBar />
          <div className="content-container">
            <DndProvider backend={HTML5Backend}>
              <TimeEntryContainer />
            </DndProvider>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeAttendanceEntryPage