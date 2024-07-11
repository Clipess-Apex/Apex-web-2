import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import EmployeeToDoView from '../EmployeeView/EmployeeToDoView'



const EmployeeToDoViewCorrectPage  = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <EmployeeToDoView/>
             </div>
           </div>
   </>
  )
}

export default EmployeeToDoViewCorrectPage 