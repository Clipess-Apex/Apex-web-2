import React from 'react'
import Header from '../../../components/shared/AdminHeader'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import ManagerView from '../ManagerView/ManagerView'



const ManagerViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <ManagerView/>
             </div>
           </div>
   </>
  )
}

export default ManagerViewCorrectPage