import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthContextProvider";
import "../../../styles/shared/LoginForm.css";
import LogoIcon from "../../../icons/shared/header/logo.png";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      await login(token);
      toast("Welcome to Clipess");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (user) {
      const normalizedUserRole = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].toLowerCase();
      console.log("Normalizesd user",normalizedUserRole)
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
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot">
            <Link to="/password-reset-request">Forgot Password?</Link>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
