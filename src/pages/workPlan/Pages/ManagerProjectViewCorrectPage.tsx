import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import ManagerView from '../ManagerView/ManagerView'
import ProjectView from '../ManagerView/ProjectView'



const ManagerProjectViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <ProjectView/>
             </div>
           </div>
   </>
  )
}

export default ManagerProjectViewCorrectPage