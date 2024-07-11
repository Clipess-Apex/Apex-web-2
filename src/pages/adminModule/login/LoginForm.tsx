import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthContextProvider";
import "../../../styles/shared/LoginForm.css";
import LogoIcon from "../../../icons/shared/header/logo.png";
import EyeIcon from "../../../icons/adminModule/eye-svgrepo-com.svg";
import EyeOffIcon from "../../../icons/adminModule/eye-closed-svgrepo-com.svg";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7166/api/Auth/login",
        {
          companyEmail,
          password,
        }
      );
      const token = response.data.token;
      login(token);
      toast("Welcome to Clipess");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (user) {
      const normalizedUserRole =
        user[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ].toLowerCase();
      console.log("Normalized user role:", normalizedUserRole);
      switch (normalizedUserRole) {
        case "manager":
          navigate("/primary-ManagerDashboardPage");
          break;
        case "employee":
          navigate("/primary-EmployeeDashboardPage");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/"); // Default case if role is not recognized
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="login-container-left-section">
        <img src={LogoIcon} alt="logo" className="login-logo" />
        <h1>CLIPESS</h1>
      </div>
      <div className="login-container-right-section">
        <h2>Log into your account</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              required
            />
          </div>
          <div className="password-input-container">
            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={isPasswordVisible ? EyeOffIcon : EyeIcon}
                alt="toggle visibility"
                className="password-toggle-icon"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </div>
          </div>
          <div className="forgot">
            <Link to="/password-reset-request">Forgot Password?</Link>
          </div>

          <button type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
