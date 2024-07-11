import React from "react";
import "../../styles/shared/Header.css";
import LogoIcon from "../../icons/shared/header/logo.png"
import { useAuth } from "../../providers/AuthContextProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: string;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

const Header = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  let decodedToken: DecodedToken | null = null;

  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded token:", decodedToken);
  }

  const handleChipClick = () => {
    if (decodedToken) {
      navigate(`/user-profile/${decodedToken.EmployeeID}`);
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={LogoIcon} />
        <div className="logoTitle">Clipess</div>
      </div>
      <div className="title">
        <div
          className="chip"
          onClick={handleChipClick}
          style={{ cursor: "pointer" }}
        >
          {decodedToken ? (
            <>
              <img
                src={decodedToken.ImageUrl}
                alt="Profile"
                width="96px"
                height="96px"
              />
              {decodedToken.FirstName} {decodedToken.LastName}
            </>
          ) : (
            "No token available"
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
