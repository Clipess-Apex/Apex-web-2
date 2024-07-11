import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Define the Login component
const Login: React.FC = () => {
  // State for storing the user ID
  const [userId, setUserId] = useState<string>('');

  // useNavigate hook from react-router for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Navigate based on the user ID
    if (userId === '1') {
      console.log('Navigating to /manager');
      navigate('/manager');
    } else if (userId === '2') {
      console.log('Navigating to /employee');
      navigate('/employee');
    } else if (userId === '3') {
      console.log('Navigating to /admin');
      navigate('/admin');
    } else {
      console.log('Invalid User ID');
      toast.error('Invalid User ID');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

// Export the Login component as the default export
export default Login;
