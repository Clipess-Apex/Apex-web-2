import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/adminModule/EmployeeStats.css';
import Employee from '../../icons/adminModule/Employee.svg'

interface EmployeeCounts {
  total: number;
  admin: number;
  manager: number;
  employee: number;
}

const EmployeeStats: React.FC = () => {
    const [counts, setCounts] = useState<EmployeeCounts>({
      total: 0,
      admin: 0,
      manager: 0,
      employee: 0,
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
        <img src={Employee} />
        <h2>Employees</h2>
        </div>
        <div className="admin-dashboard-stats">
          <div className="admin-dashboard-stat-item" style={{marginRight:50}}>
            <span>Total</span>
            <span>{counts.total}</span>
          </div>
          <div className="admin-dashboard-stat-item" style={{marginRight:20}}>
            <span>Admin</span>
            <span>{counts.admin}</span>
          </div>
          <div className="admin-dashboard-stat-item" style={{marginRight:20}}>
            <span>Manager</span>
            <span>{counts.manager}</span>
          </div>
          <div className="admin-dashboard-stat-item">
            <span>Employee</span>
            <span>{counts.employee}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default EmployeeStats;
