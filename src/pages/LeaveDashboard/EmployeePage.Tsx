import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeInterface: React.FC = () => {
  return (
    <div>
      <h1>Leave Dashboard</h1>
      <Link to="/leave-request">
        <button>Request Leaves</button>
      </Link>
      <Link to="/leave-history">
        <button>View Leave History</button>
      </Link>
    </div>
  );
};

export default EmployeeInterface;
