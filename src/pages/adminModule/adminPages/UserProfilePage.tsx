import React from 'react'
import Header from "../../../components/shared/Header";
import AdminSideBar from '../../../components/shared/AdminSideBar';
import UserProfile from '../UserProfile';
import "../../../styles/adminModule/adminLayout/AdminLayout.css";

function UserProfilePage() {
  return (
    <>
      <div className="admin">
        <Header />
        <div className="mainContainer">
          <AdminSideBar />
          <div className="content-container">
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfilePage
