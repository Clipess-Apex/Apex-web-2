import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/AlternativeLayout/AlternativeLayout.css'
import ManagerView from '../ManagerView/ManagerView'
import ClientView from '../ManagerView/ClientView'



const ManagerClientViewCorrectPage = () => {
  return (
    <>
    <Header />
           <div className="AlternativeMainContainer">
             <SideBar />
             <div className="AlternativeContentContainer">
                <ClientView/>
             </div>
           </div>
   </>
  )
}

export default ManagerClientViewCorrectPage