import React from "react";
import { useParams } from "react-router-dom";
import EmployeeDetails from "./EmployeeDetails";

const UserProfile: React.FC = () => {
  return (
    <div>
      <h1 style={{color:'#00a7a7'}}>User Profile</h1>
      <EmployeeDetails showButtons={false} showHeader={false} />
    </div>
  );
};

export default UserProfile;
