import React, { useState, ReactNode, useContext, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

interface DecodedToken {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  employeeId: number | null;
  login: (token: string) => void;
  logout: () => void;
  user: DecodedToken | null;
}

interface StoredUser {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const navigate = useNavigate();

  const decodeAndSetUser = (jwtToken: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(jwtToken);
      updateUser(decodedToken);
      setToken(jwtToken);
      setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      setEmployeeId(decodedToken.EmployeeID);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  };

  const login = (newToken: string) => {
    setToken(newToken); 
    if (newToken) {
      localStorage.setItem("token", newToken);
      decodeAndSetUser(newToken);
    }
  };

  const updateUser = (updatedUser: DecodedToken) => {
    try {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setEmployeeId(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login page after logout
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); 
      updateUser(parsedUser);
      console.log("Parsed user is",parsedUser.EmployeeID)
      console.log("pASED USER IS", user)
      const decodedToken = jwtDecode<DecodedToken>(jwtToken || "");
      setToken(jwtToken);
      setRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      setEmployeeId(decodedToken.EmployeeID);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, employeeId, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
