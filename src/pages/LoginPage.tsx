// import React, { useState,FormEvent } from 'react';
// import { useAuth } from '../providers/AuthContextProvider';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// //Define the type for the decoded TWT token
// interface decodedToken {
//     [key: string]: any;
//     'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
// }

// //Define the component
// const Login: React.FC = () => {
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');

//     //Get login function from AuthContext
//     const { login } = useAuth();

//     //Use navigate funtion from react-router
//     const navigate = useNavigate();

//     //Handle form submission
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post<{ token: string }>('https://localhost:7166/api/Auth/login', {
//                 copanyEmail: username,
//                 password: password
//             });
//             const { token } = response.data;

//             //Log the received token for debugging purposes
//             console.log('Received token:', token);
//             login(token);

//             //Decode the JWT token to get user detailes
//             const decodedToken: decodedToken = jwtDecode<decodedToken>(token);
//             console.log('Decoded token:',decodedToken);

//             //Extract the user role from the decoded token
//             const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
//             console.log('Extract user role:', userRole);

//             const normalizedUserRole = userRole.toLocaleLowerCase();

//             //Navigate to the appropriate page based on user role
//             if(normalizedUserRole === 'manager') {
//                 console.log('Navigating to /manager');
//                 navigate('/manager');
//             } else if (normalizedUserRole === 'employee') {
//                 console.log('Navigate to /employee');
//                 navigate('/employee');
//             } else if( normalizedUserRole === 'admin') {
//                 console.log('Navigate to /admin');
//                 navigate('/admin');
//             } else {
//                 console.error('Unknown role:', normalizedUserRole);
//                 alert('Unkown role');
//             }
//          } catch (error) {
//             console.error('Login error:', error);
//             alert('Login failed.pleace check your credentials.');
//             }
//         };

//         return(
//             <form onSubmit={handleSubmit}>
//             <div>
//               <label>Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit">Login</button>
//           </form>
//         );
//     };

import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

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
      alert('Invalid User ID');
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
