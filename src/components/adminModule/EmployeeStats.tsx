import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/adminModule/EmployeeStats.css';
import Employee from '../../icons/adminModule/Employee.svg';

interface EmployeeCounts {
  total: number;
  roleCounts: { [key: string]: number };
}

const EmployeeStats: React.FC = () => {
  const [counts, setCounts] = useState<EmployeeCounts>({
    total: 0,
    roleCounts: {},
  });

  useEffect(() => {
    const fetchEmployeeCounts = async () => {
      try {
        const response = await axios.get<EmployeeCounts>('https://localhost:7166/api/employee/employeeCounts');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching employee counts:', error);
      }
    };

    fetchEmployeeCounts();
  }, []);

  return (
    <div className="admin-dashboard-employee-stats">
      <div className="admin-dashboard-employee-stats__title">
        <img src={Employee} alt="Employee Icon" />
        <h2>Employees</h2>
      </div>
      <div className="admin-dashboard-stats">
        <div className="admin-dashboard-stat-item" style={{ marginRight: 50 }}>
          <span>Total</span>
          <span>{counts.total}</span>
        </div>
        {Object.entries(counts.roleCounts).map(([role, count]) => (
          <div className="admin-dashboard-stat-item" key={role} style={{ marginRight: 20 }}>
            <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeStats;
