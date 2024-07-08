import React, { useState, ReactNode, useContext, FC, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: string;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  employeeId: number | null;
  login: (token: string, role: string, employeeId: number) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const navigate = useNavigate();

  
  const login = (newToken: string, userRole: string, empId: number) => {
    const expires = new Date(new Date().getTime() +   60*60* 1000);
    setToken(newToken);
    setRole(userRole);
    setEmployeeId(empId);
    Cookies.set("token", newToken, { expires, secure: true }); // Example: expires in 1 day, secure flag enabled
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setEmployeeId(null);
    Cookies.remove("token");
    
    navigate("/"); // Redirect to login page after logout
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUser(decodedToken);
        setToken(token);
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); 
        window.location.reload();
        // Logout user if token is invalid or expired
      }
    } else {
      setUser(null);
      logout();
    }
  }, [ ]);

  return (
    <AuthContext.Provider value={{ token, role, employeeId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
