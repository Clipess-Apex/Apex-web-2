import React, { useState } from 'react';
import '../../../styles/shared/PasswordResetRequest.css'
import { toast } from "react-toastify";

const PasswordResetRequest: React.FC = () => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSuccess("");

    try {
      const response = await fetch('https://localhost:7166/api/Auth/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyEmail }),
      });

      if (response.ok) {
        toast.success('Password reset request sent. Please check your email.');
      } else {
        setMessage('Failed to send password reset request. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='password-reset-request-container'>
      <h2>Password Reset Request</h2>
      <form onSubmit={handleSubmit}>
        <div className='password-reset-request-inner'>
          <label className='password-reset-request-inner-label'>Email:</label>
          <input
            type="email"
            id="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            required
          />
        </div>
        <button className='password-request-button' type="submit">Request Password Reset</button>
      </form>
      {success && <p className="password-reset-request-success-message">{success}</p>}
      {message && <p className="password-reset-request-error-message">{message}</p>}
    </div>
  );
};

export default PasswordResetRequest;
