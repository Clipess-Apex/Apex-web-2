import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import EmployeeProjectView from '../EmployeeView/EmployeeProjectView'



const EmployeeProjectViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <EmployeeProjectView/>
             </div>
           </div>
   </>
  )
}

export default EmployeeProjectViewCorrectPage