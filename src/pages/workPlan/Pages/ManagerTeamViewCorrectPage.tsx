import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import ManagerView from '../ManagerView/ManagerView'
import TeamView from '../ManagerView/TeamView'



const ManagerTeamViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <TeamView/>
             </div>
           </div>
   </>
  )
}

export default ManagerTeamViewCorrectPage