import React, { useState } from 'react';
import axios from 'axios';
import '../../../styles/shared/ChangePassword.css'

interface PasswordChange {
    CompanyEmail: string;
    CurrentPassword: string;
    NewPassword: string;
}

const ChangePassword: React.FC = () => {
    const [model, setModel] = useState<PasswordChange>({
        CompanyEmail: '',
        CurrentPassword: '',
        NewPassword: '',
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7166/api/Auth/changePassword', model);
            setMessage(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('An error occurred while changing the password.');
            }
        }
    };

    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit} className="change-password-form">
                <h2>Change Password</h2>
                <div className="change-password-form-group">
                    <label htmlFor="CompanyEmail">Company Email</label>
                    <input
                        type="email"
                        name="CompanyEmail"
                        id="CompanyEmail"
                        value={model.CompanyEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="change-password-form-group">
                    <label htmlFor="CurrentPassword">Current Password</label>
                    <input
                        type="password"
                        name="CurrentPassword"
                        id="CurrentPassword"
                        value={model.CurrentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="change-password-form-group">
                    <label htmlFor="NewPassword">New Password</label>
                    <input
                        type="password"
                        name="NewPassword"
                        id="NewPassword"
                        value={model.NewPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="change-password-submit-button">Change Password</button>
                {message && <p className="change-password-message">{message}</p>}
            </form>
        </div>
    );
};

export default ChangePassword;
