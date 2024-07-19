import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import EmployeeWorkCalendarView from '../EmployeeView/EmployeeWorkCalendarView'



const EmployeeWorkCalendarViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <EmployeeWorkCalendarView/>
             </div>
           </div>
   </>
  )
}

export default EmployeeWorkCalendarViewCorrectPage