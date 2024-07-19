import React from 'react'
import Header from "../../../components/shared/AdminHeader";
import AdminSideBar from '../../../components/shared/AdminSideBar';
import SideBar from '../../../components/shared/SideBar';
import UserProfile from '../UserProfile';
import "../../../styles/adminModule/adminLayout/AdminLayout.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../providers/AuthContextProvider";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const UserProfilePage: React.FC = () => {
  const { token } = useAuth();

  let decodedToken: DecodedToken | null = null;

  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded token inside sideBar:", decodedToken);
  }

  const userRole = decodedToken
    ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    : null;

  const normalizedUserRole = userRole?.toLowerCase();
  console.log(normalizedUserRole);

  return (
    <div className="admin">
      <Header />
      <div className="mainContainer">
        {normalizedUserRole === "admin" ? <AdminSideBar /> : <SideBar />}
        <div className="content-container">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
