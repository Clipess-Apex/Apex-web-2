import React from 'react'
import EmployeeAttendancePieChart from '../../components/timeEntry/Dashboard/EmployeeAttendancePieChart'
import EmployeeCalendar from '../../components/timeEntry/Dashboard/EmployeeCalendar'
import '../../styles/timeEntry/pages/EmployeeDashBoardPage.css'
import { ReactComponent as AttendanceIcon } from '../../icons/timeEntry/AttendanceIcon.svg'
import { ReactComponent as RecordIcon } from '../../icons/timeEntry/RecordIcon.svg'
import { Link, useNavigate } from "react-router-dom";
import Card from '../../components/timeEntry/Dashboard/Card'
import Header from '../../components/shared/AdminHeader'
import SideBar from '../../components/shared/SideBar'


const employeeCardData = [
  {
    id: 1,
    title: (<>Mark<br />Attendance</>),
    content: "",
    icon: <AttendanceIcon />,
    path: "/timeEntry/employee/markAttendance"

  }, {
    id: 2,
    title: (<>Your<br />Records</>),
    content: "",
    icon: <RecordIcon />,
    path: "/timeEntry/employee/employeeRecords"
  }]

const EmployeeDashBoardPage = () => {
  return (
    <>
      <div className="EmployeeDashboardPage">
        <Header />
        <div className="mainContainer">
          <SideBar />
          <div className="content-container">
            <div className="cardContainer">
              {employeeCardData.map((card) => (
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
            <div className="employeeChartContainer1">
              <EmployeeAttendancePieChart />
              <EmployeeCalendar />
            </div>
            <div className="employeeChartContainer2">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeDashBoardPage