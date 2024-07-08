import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EditButton from "../../components/adminModule/EditButton";
import "../../styles/adminModule/EmployeeDetails.css";

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
  departmentID: number;
  maritalStatusID: number;
  imageUrl: string;
  fileUrl: string;
  deleted: boolean;
}

interface Role {
  roleID: number;
  roleName: string;
  deleted: boolean;
}

interface EmployeeType {
  employeeTypeID: number;
  employeeTypeName: string;
  deleted: boolean;
}

interface Department {
  departmentID: string;
  departmentName: string;
  deleted: boolean;
}

interface MaritalStatus {
  maritalStatusID: string;
  maritalStatusType: string;
  deleted: boolean;
}

interface EmployeeDetailsProps {
  showButtons?: boolean;
  showHeader?: boolean;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  showButtons = true,
  showHeader = true,
}) => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [originalEmployee, setOriginalEmployee] = useState<Employee | null>(
    null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [roles, setRoles] = useState<Role[]>([]);
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
  const [employeeToRemove, setEmployeeToRemove] = useState<Employee | null>(null);
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      console.log("Employee ID:", id);

      const fetchData = async (employeeID: string) => {
        try {
          const response = await axios.get<Employee>(
            `https://localhost:7166/api/employee/getEmployee/${employeeID}`
          );
          if (response.status !== 200) {
            throw new Error("Something went wrong!");
          }
          console.log("Fetched data:", response.data);

          setEmployee(response.data);
          setOriginalEmployee(response.data);
          setIsLoading(false);
        } catch (err) {
          console.error("Fetch error:", err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
          setIsLoading(false);
        }
      };

      const fetchRoles = async () => {
        try {
          const response = await axios.get<Role[]>(
            "https://localhost:7166/api/role/getRole"
          );
          const filteredRoles = response.data.filter(
            (role: Role) => !role.deleted
          );
          setRoles(filteredRoles);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };

      const fetchEmployeeTypes = async () => {
        try {
          const response = await axios.get<EmployeeType[]>(
            "https://localhost:7166/api/employeeType/getEmployeeType"
          );
          const data = Array.isArray(response.data) ? response.data : [];
          const filteredEmployeeTypes = data.filter(
            (employeeType: EmployeeType) => !employeeType.deleted
          );
          setEmployeeTypes(filteredEmployeeTypes);
        } catch (err) {
          setError("Error fetching EmployeeTypes");
        } finally {
          setIsLoading(false);
        }
      };

      const fetchDepartments = async () => {
        try {
          const response = await axios.get<Department[]>(
            "https://localhost:7166/api/department/getDepartment"
          );
          const filteredDepartment = response.data.filter(
            (department: Department) => !department.deleted
          );
          setDepartments(filteredDepartment);
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      };

      const fetchMaritalStatus = async () => {
        try {
          const response = await axios.get<MaritalStatus[]>(
            "https://localhost:7166/api/maritalStatus/getMaritalStatus"
          );
          const filteredMaritalStatus = response.data.filter(
            (maritalStatus: MaritalStatus) => !maritalStatus.deleted
          );
          setMaritalStatus(filteredMaritalStatus);
        } catch (error) {
          console.error("Error fetching maritalStatus:", error);
        }
      };

      fetchData(id);
      fetchRoles();
      fetchEmployeeTypes();
      fetchDepartments();
      fetchMaritalStatus();
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setPdfFile(event.target.files[0]);
    }
  };

  const handleSaveClick = async () => {
    if (employee) {
      try {
        const formData = new FormData();

        // Serialize the employee object into JSON
        const otherData = JSON.stringify(employee);
        formData.append("OtherData", otherData);

        // Append the image file if it exists
        if (imageFile) {
          formData.append("Image", imageFile);
        }

        // Make the PUT request
        const response = await axios.put<Employee>(
          `https://localhost:7166/api/employee/UpdateEmployee/${employee.employeeID}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // If no new image is selected, preserve the existing imageUrl
        if (imageFile === null) {
          formData.append("Image", employee.imageUrl);
        }

        if (response.status === 200) {
          console.log("Employee updated successfully");
          setEmployee(response.data);
          setOriginalEmployee(response.data);
          setIsEditable(false);
        } else {
          throw new Error("Failed to update employee data");
        }
      } catch (err) {
        console.error("Save error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  const handleCancelClick = () => {
    setEmployee(originalEmployee);
    setIsEditable(false);
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToRemove(employee);
    setShowRemovePopup(true);
  };

  const confirmDelete = async () => {
    if (employeeToRemove) {
      try {
        const updateData = {
          ...employeeToRemove,
          deleted: true,
          firstName: employeeToRemove.firstName,
          lastName: employeeToRemove.lastName,
          nic: employeeToRemove.nic,
          personalEmail: employeeToRemove.personalEmail,
          companyEmail: employeeToRemove.companyEmail,
          mobileNumber: employeeToRemove.mobileNumber,
          telephoneNumber: employeeToRemove.telephoneNumber,
          address: employeeToRemove.address,
          designation: employeeToRemove.designation,
          emergencyContactPersonName: employeeToRemove.emergencyContactPersonName,
          emergencyContactPersonMobileNumber:
          employeeToRemove.emergencyContactPersonMobileNumber,
          emergencyContactPersonAddress: employeeToRemove.emergencyContactPersonAddress,
          reportingEmployeeID: employeeToRemove.reportingEmployeeID,
          employeeTypeID: employeeToRemove.employeeTypeID,
          roleID: employeeToRemove.roleID,
          departmentID: employeeToRemove.departmentID,
          maritalStatusID: employeeToRemove.maritalStatusID,
          imageUrl: employeeToRemove.imageUrl,
        };

        const response = await axios.put<Employee>(
          `https://localhost:7166/api/employee/UpdateDeleteStatus/${employeeToRemove.employeeID}`,
          updateData
        );
        if (response.status === 200) {
          console.log("Employee delete status updated successfully");
          setEmployee(response.data);
          alert("Employee status updated to deleted successfully.");
        } else {
          throw new Error("Failed to update employee delete status");
        }
      } catch (err) {
        console.error("Delete error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  const cancelDelete = () => {
    setShowRemovePopup(false);
    setEmployeeToRemove(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!employee) {
    return <p>No employee data available</p>;
  }

  return (
    <>
      {showHeader && <h1 style={{color:'#00a7a7'}}>Employee Details</h1>}
      <div className="employee-details-container">
        <div className="employee-details">
          <div className="employee-details-image-container">
            {employee.imageUrl?(
          <img
            src={employee.imageUrl}
            alt="Profile"
            className="employee-details-profile-picture"
          />
            ):(
              <div className="placeholder-employee-details-image">Add Image</div>
            )}
          {isEditable && <input type="file" onChange={handleFileChange} className="employee-details-image-file-input"/>}</div>
          <div className="employee-details-row">
            <div className="column">
              <label>Employee ID:</label>
              <br />
              <input type="text" value={employee.employeeID} readOnly />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>First Name:</label>
              <br />
              <input
                type="text"
                value={employee.firstName}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, firstName: e.target.value })
                }
              />
            </div>
            <div className="column">
              <label>Last Name:</label>
              <br />
              <input
                type="text"
                value={employee.lastName}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Date Of Birth:</label>
              <br />
              <input
                type="text"
                value={employee.dateOfBirth}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, dateOfBirth: e.target.value })
                }
              />
            </div>
            <div className="column">
              <label>NIC:</label>
              <br />
              <input
                type="text"
                value={employee.nic}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, nic: e.target.value })
                }
              />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Personal Email:</label>
              <br />
              <input
                type="text"
                value={employee.personalEmail}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, personalEmail: e.target.value })
                }
              />
            </div>
            <div className="column">
              <label>Company Email:</label>
              <br />
              <input
                type="text"
                value={employee.companyEmail}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, companyEmail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Mobile Number:</label>
              <br />
              <input
                type="text"
                value={employee.mobileNumber}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, mobileNumber: e.target.value })
                }
              />
            </div>
            <div className="column">
              <label>Telephone Number:</label>
              <br />
              <input
                type="text"
                value={employee.telephoneNumber}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, telephoneNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Address:</label>
              <br />
              <input
                type="text"
                value={employee.address}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
              />
            </div>
            <div className="column">
              <label>Designation:</label>
              <br />
              <input
                type="text"
                value={employee.designation}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, designation: e.target.value })
                }
              />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Emergency Contact Person Name:</label>
              <br />
              <input
                type="text"
                value={employee.emergencyContactPersonName}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    emergencyContactPersonName: e.target.value,
                  })
                }
              />
            </div>
            <div className="column">
              <label>Emergency Contact Person Mobile Number:</label>
              <br />
              <input
                type="text"
                value={employee.emergencyContactPersonMobileNumber}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    emergencyContactPersonMobileNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Emergency Contact Person Address:</label>
              <br />
              <input
                type="text"
                value={employee.emergencyContactPersonAddress}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    emergencyContactPersonAddress: e.target.value,
                  })
                }
              />
            </div>
            <div className="column">
              <label>Reporting Employee ID:</label>
              <br />
              <input
                type="text"
                value={employee.reportingEmployeeID}
                readOnly={!isEditable}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    reportingEmployeeID: +e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Employee Type ID:</label>
              <br />
              <select
                value={employee.employeeTypeID}
                disabled={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, employeeTypeID: +e.target.value })
                }
              >
                {employeeTypes.map((employeeType) => (
                  <option
                    key={employeeType.employeeTypeID}
                    value={employeeType.employeeTypeID}
                  >
                    {employeeType.employeeTypeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="column">
              <label>Role ID:</label>
              <br />
              <select
                value={employee.roleID}
                disabled={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, roleID: +e.target.value })
                }
              >
                {roles.map((role) => (
                  <option key={role.roleID} value={role.roleID}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="employee-details-row">
            <div className="column">
              <label>Department ID:</label>
              <br />
              <select
                value={employee.departmentID}
                disabled={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, departmentID: +e.target.value })
                }
              >
                {departments.map((department) => (
                  <option
                    key={department.departmentID}
                    value={department.departmentID}
                  >
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>
            <div className="column">
              <label>Marital Status ID:</label>
              <br />
              <select
                value={employee.maritalStatusID}
                disabled={!isEditable}
                onChange={(e) =>
                  setEmployee({ ...employee, maritalStatusID: +e.target.value })
                }
              >
                {maritalStatus.map((maritalStatus) => (
                  <option
                    key={maritalStatus.maritalStatusID}
                    value={maritalStatus.maritalStatusID}
                  >
                    {maritalStatus.maritalStatusType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showRemovePopup && (
        <div className="admin-popup">
          <div className="admin-popup-inner">
            <h2>Confirm Remove</h2>
            <p>
              Are you sure you want to remove the employee "{employeeToRemove?.firstName}
              "?
            </p>
            <div className="delete-model-button-container">
            <button className="lookup-row-delete" onClick={confirmDelete}>Delete</button>&emsp;&emsp;&emsp;
            <button className="lookup-row-delete-cancel" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

          {showButtons && (
            <div className="employee-details-button-row">
              {isEditable ? (
                <>
                  <button
                    className="admin-employeeDetails-btn-save"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="admin-employeeDetails-btn-cancel"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <EditButton onClick={handleEditClick} />
                  &emsp;&emsp;&emsp;
                  <button
                    className="admin-employeeDetails-btn-delete"
                    onClick={() => handleDeleteClick(employee)}
                  >
                    Delete Employee
                  </button>
                  &emsp;&emsp;&emsp;
                  <Link to="/employeeTable">
                    <button className="admin-employeeDetails-btn-done">
                      Done
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
