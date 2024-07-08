import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import EmployeeTaskView from '../EmployeeView/EmployeeTaskView'



const EmployeeTaskViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <EmployeeTaskView/>
             </div>
           </div>
   </>
  )
}

export default EmployeeTaskViewCorrectPage