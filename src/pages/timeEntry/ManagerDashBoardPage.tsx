import React from 'react'
import ManagerAttendanceBarChart from '../../components/timeEntry/Dashboard/ManagerAttendanceBarChart'
import '../../styles/timeEntry/pages/ManagerDashBoardPage.css'
import { Link, useNavigate } from "react-router-dom";
import Card from '../../components/timeEntry/Dashboard/Card'
import { ReactComponent as AttendanceIcon } from '../../icons/timeEntry/AttendanceIcon.svg'
import { ReactComponent as CalendarPlusIcon } from '../../icons/timeEntry/CalendarPlusIcon.svg'
import { ReactComponent as RecordIcon } from '../../icons/timeEntry/RecordIcon.svg'
import Header from '../../components/shared/AdminHeader'
import SideBar from '../../components/shared/SideBar'
import EmployeeAttendancePieChart from '../../components/timeEntry/Dashboard/EmployeeAttendancePieChart'
import EmployeeCalendar from '../../components/timeEntry/Dashboard/EmployeeCalendar'

const managerCardData = [
  {
    id: 1,
    title: (<>Mark<br />Attendance</>),
    content: "",
    icon: <AttendanceIcon />,
    path: "/timeEntry/manager/markAttendance"

  }, {
    id: 2,
    title: (<>Your<br />Records</>),
    content: "",
    icon: <RecordIcon />,
    path: "/timeEntry/manager/employeeRecords"
  },
  {
    id: 3,
    title: (<>Setup Working<br />Calendar</>),
    content: "",
    icon: <CalendarPlusIcon />,
    path: "/timeEntry/manager/managerDateAssignment"
  },
  {
    id: 4,
    title: (<>Company<br />Records</>),
    content: "",
    icon: <RecordIcon />,
    path: "/timeEntry/manager/managerRecords"
  }
]

const ManagerDashBoardPage = () => {
  return (
    <>
      <div className="ManagerDashboardPage">
        <Header />
        <div className="mainContainer">
          <SideBar />
          <div className="content-container">
            <div className="cardContainer">
              {managerCardData.map((card) => (
                <Link to={card.path} key={card.id} style={{ textDecoration: "none" }}>
                  <Card
                    key={card.id}
                    title={card.title}
                    content={card.content}
                    icon={card.icon}
                  />
                </Link>
              ))}
            </div>
            <div className="managerChartContainer1">
              <EmployeeAttendancePieChart />
              <EmployeeCalendar />
            </div>
            <div className="managerChartContainer2">
              <ManagerAttendanceBarChart/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagerDashBoardPage
