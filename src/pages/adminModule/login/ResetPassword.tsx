import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../../../styles/shared/PasswordReset.css'

const PasswordReset: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [companyemail, setCompanyEmail] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const companyemail = params.get("email") || "";
    const token = params.get("token") || "";

    setCompanyEmail(companyemail);
    setToken(token);
  }, [location]);

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePasswords = () => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (validatePasswords()) {
      try {
        const response = await fetch(
          "https://localhost:7166/api/Auth/resetPassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ companyemail, token, newPassword,confirmPassword }),
          }
        );

        if (response.ok) {
          setSuccess("Your password has been reset successfully.");
        } else {
          const responseData = await response.json();
          if (responseData.errors && responseData.errors.ConfirmPassword) {
            setError(responseData.errors.ConfirmPassword.join(" "));
          } else {
            setError("Failed to reset password. Please try again.");
          }
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Change Your Password</h2>
      <p>Enter a new password below to change your password.</p>
      <form onSubmit={handleResetPassword}>
        <div className="password-reset-input-group">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="button" onClick={handleToggleNewPasswordVisibility}>
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="password-reset-input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="button" onClick={handleToggleConfirmPasswordVisibility}>
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && <p className="password-reset-error-message">{error}</p>}
        {success && <p className="password-reset-success-message">{success}</p>}
        <button type="submit" className="password-reset-button">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
