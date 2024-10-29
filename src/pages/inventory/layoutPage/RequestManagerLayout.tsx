import React from 'react'
import Header from '../../../components/shared/Header'
import SideBar from '../../../components/shared/SideBar'
import '../../../styles/inventory/inventoryLayout/inventoryLayout.css'

import RequestManager from '../pages/RequestManager'


const RequestManagerLayout = () => {
  return (
    <>
    <div className="inventory">
      <Header />
      <div className="mainContainer">
        <SideBar />
        <div className="content-container">
          <RequestManager/>
        </div>
      </div>
    </div>
  </>
  )
}

export default RequestManagerLayout
