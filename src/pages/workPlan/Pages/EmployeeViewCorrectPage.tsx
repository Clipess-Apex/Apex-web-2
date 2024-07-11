import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import EmployeeView from '../EmployeeView/EmployeeView'



const EmployeeViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <EmployeeView/>
             </div>
           </div>
   </>
  )
}

export default EmployeeViewCorrectPage