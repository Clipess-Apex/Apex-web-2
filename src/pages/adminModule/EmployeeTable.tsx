import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../../styles/adminModule/EmployeeTable.css";

interface Department {
  departmentName: string;
}

interface Employee {
  employeeID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nic: string;
  personalEmail: string;
  companyEmail: string;
  mobileNumber: string;
  telephoneNumber: string;
  address: string;
  designation: string;
  emergencyContactPersonName: string;
  emergencyContactPersonMobileNumber: string;
  emergencyContactPersonAddress: string;
  reportingEmployeeID: number;
  employeeTypeID: number;
  roleID: number;
  department?: Department;
  departmentName: string;
  maritalStatusID: number;
  deleted: boolean;
}

const EmployeeTable: React.FC = () => {
  const [joinedData, setJoinedData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://localhost:7166/api/employee/getEmployee"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data: Employee[] = await response.json();
      console.log(data);

      const formattedData = Array.isArray(data)
        ? data
            .filter((employee) => !employee.deleted)
        : [data];

      setJoinedData(formattedData);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = joinedData.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="employee-table-container">
      <div className="employee-table-page-top">
        <div className="employee-table-search-container">
          <FaSearch id="search-icon" />
          <input
            type="text"
            placeholder="Search by User Name..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ padding: "8px", width: "300px" }}
          />
        </div>
        <div
          style={{
            width: "95%",
            margin: "auto",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="new-employee-add-btn">
            <Link to="/employeeTable/add-employee">
              <button className="new-employee-btn-add">ADD Employee +</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>User Name</th>
              <th>NIC</th>
              <th>Company Email</th>
              <th>Mobile Number</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredEmployees) &&
              filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.employeeID}</td>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td>{employee.nic}</td>
                  <td>{employee.companyEmail}</td>
                  <td>{employee.mobileNumber}</td>
                  <td>{employee.designation}</td>
                  <td>
                    <Link to={`/employeeTable/employeeDetails/${employee.employeeID}`}>
                      View More
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
