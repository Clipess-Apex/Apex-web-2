import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import TaskView from '../ManagerView/TaskView'



const ManagerTaskViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <TaskView/>
             </div>
           </div>
   </>
  )
}

export default ManagerTaskViewCorrectPage