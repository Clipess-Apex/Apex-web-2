import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/adminModule/addEmployeeForm/AddEmployeeForm.css";

interface FormData {
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
  reportingEmployeeID: string;
  employeeTypeID: string;
  roleID: string;
  departmentID: string;
  maritalStatusID: string;
  createdBy: string;
  deleted: boolean;
  deletedDate: string;
  deletedBy: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nic: string;
  personalEmail: string;
  companyEmail: string;
  mobileNumber: string;
  designation: string;
  reportingEmployeeID: string;
  employeeTypeID: string;
  roleID: string;
  departmentID: string;
}

interface Employee {
  employeeID: string;
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
  reportingEmployeeID: string;
  employeeTypeID: string;
  roleID: string;
  departmentID: string;
  maritalStatusID: string;
  createdBy: string;
  deleted: boolean;
  deletedDate: string;
  deletedBy: string;
}

interface Role {
  roleID: string;
  roleName: string;
  deleted: boolean;
}

interface EmployeeType {
  employeeTypeID: string;
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

const AddEmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nic: "",
    personalEmail: "",
    companyEmail: "",
    mobileNumber: "",
    telephoneNumber: "",
    address: "",
    designation: "",
    emergencyContactPersonName: "",
    emergencyContactPersonMobileNumber: "",
    emergencyContactPersonAddress: "",
    reportingEmployeeID: "",
    employeeTypeID: "",
    roleID: "",
    departmentID: "",
    maritalStatusID: "",
    createdBy: "",
    deleted: false,
    deletedDate: "",
    deletedBy: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nic: "",
    personalEmail: "",
    companyEmail: "",
    mobileNumber: "",
    designation: "",
    reportingEmployeeID: "",
    employeeTypeID: "",
    roleID: "",
    departmentID: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [otherFile, setOtherFile] = useState<File | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);

  const initialFormData: FormData = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nic: "",
    personalEmail: "",
    companyEmail: "",
    mobileNumber: "",
    telephoneNumber: "",
    address: "",
    designation: "",
    emergencyContactPersonName: "",
    emergencyContactPersonMobileNumber: "",
    emergencyContactPersonAddress: "",
    reportingEmployeeID: "",
    employeeTypeID: "",
    roleID: "",
    departmentID: "",
    maritalStatusID: "",
    createdBy: "",
    deleted: false,
    deletedDate: "",
    deletedBy: "",
  };

  useEffect(() => {
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

    const fetchEmployees = async () => {
      try {
        const response = await axios.get<Employee[]>(
          "https://localhost:7166/api/employee/getEmployee"
        );
        const filteredEmployees = response.data.filter(
          (employee: Employee) => !employee.deleted
        );
        setEmployees(filteredEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get<EmployeeType[]>(
          "https://localhost:7166/api/employeetype/getEmployeeType"
        );
        const filteredEmployeeTypes = response.data.filter(
          (employeeType: EmployeeType) => !employeeType.deleted
        );
        setEmployeeTypes(filteredEmployeeTypes);
      } catch (error) {
        console.error("Error fetching employee types:", error);
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

    fetchEmployees();
    fetchRoles();
    fetchEmployeeTypes();
    fetchDepartments();
    fetchMaritalStatus();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleOtherFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setOtherFile(event.target.files[0]);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nic: "",
      personalEmail: "",
      companyEmail: "",
      mobileNumber: "",
      designation: "",
      reportingEmployeeID: "",
      employeeTypeID: "",
      roleID: "",
      departmentID: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "*First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "*Last name is required";
      isValid = false;
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "*Date Of Birth is required";
      isValid = false;
    }

    if (!formData.nic.trim()) {
      newErrors.nic = "*nic is required";
      isValid = false;
    }
    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = "*Personal Email is required";
      isValid = false;
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = "*Company Email is required";
      isValid = false;
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "*Mobile Number is required";
      isValid = false;
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "*Designation is required";
      isValid = false;
    }

    if (!formData.reportingEmployeeID.trim()) {
      newErrors.reportingEmployeeID = "*Reporting Employee is required";
      isValid = false;
    }

    if (!formData.employeeTypeID.trim()) {
      newErrors.employeeTypeID = "*Employee Type is required";
      isValid = false;
    }

    if (!formData.roleID.trim()) {
      newErrors.roleID = "*Role is required";
      isValid = false;
    }

    if (!formData.departmentID.trim()) {
      newErrors.departmentID = "*Department is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();

      const otherData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        nic: formData.nic,
        personalEmail: formData.personalEmail,
        companyEmail: formData.companyEmail,
        mobileNumber: formData.mobileNumber,
        telephoneNumber: formData.telephoneNumber,
        address: formData.address,
        designation: formData.designation,
        emergencyContactPersonName: formData.emergencyContactPersonName,
        emergencyContactPersonMobileNumber:
          formData.emergencyContactPersonMobileNumber,
        emergencyContactPersonAddress: formData.emergencyContactPersonAddress,
        reportingEmployeeID: formData.reportingEmployeeID,
        employeeTypeID: formData.employeeTypeID,
        roleID: formData.roleID,
        departmentID: formData.departmentID,
        maritalStatusID: formData.maritalStatusID,
        createdBy: formData.createdBy,
        deleted: formData.deleted,
        deletedDate: formData.deletedDate,
        deletedBy: formData.deletedBy,
      };

      const otherDataJson = JSON.stringify(otherData);

      for (const key in formData) {
        const value = formData[key as keyof FormData];
        formDataToSend.append(
          key,
          typeof value === "boolean" ? String(value) : value
        );
      }

      formDataToSend.append("OtherData", otherDataJson);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      if (otherFile) {
        formDataToSend.append("file", otherFile);
      }

      const response = await axios.post(
        "https://localhost:7166/api/employee/AddEmployee",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      alert("Employee added successfully!");

      setFormData(initialFormData);
      setImageFile(null);
      setOtherFile(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server error:", error.response.data);
          alert("Server error. Please check the form data.");
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response received from the server. Please try again.");
        } else {
          console.error("Error:", error.message);
          alert("An error occurred. Please try again.");
        }
      } else {
        console.error("Generic error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div >
      <h1 style={{color:'#00a7a7', marginBottom:0}}>Add New Employee</h1>
      <div className="add-employee-form-container">
        <form
          className="add-employee-form"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <h3 className="add-employee-form-h3">Basic Information:</h3>

          <div className="add-employee-form-dividers">
            <div className="add-employeeee-form-input-field">
              <label htmlFor="firstName">First Name: </label>
              <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {formErrors.firstName && (
                <span style={{ color: "red" }}>{formErrors.firstName}</span>
              )}
            </div>
            <div className="add-employeeee-form-input-field">
              <label htmlFor="lastName">Last Name: </label>
              <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {formErrors.lastName && (
                <span style={{ color: "red" }}>{formErrors.lastName}</span>
              )}
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div className="add-employeeee-form-input-field">
              <label htmlFor="dateOfBirth">Date Of Birth: </label>
              <br />
              <input
                type="date"
                // className="datepicker-input"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              {formErrors.dateOfBirth && (
                <span style={{ color: "red" }}>{formErrors.dateOfBirth}</span>
              )}
            </div>
            <div className="add-employeeee-form-input-field">
              <label htmlFor="nic">NIC: </label>
              <br />
              <input
                type="text"
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
              />
              {formErrors.nic && (
                <span style={{ color: "red" }}>{formErrors.nic}</span>
              )}
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div className="add-employeeee-form-input-field">
              <label htmlFor="mobileNumber">Mobile Number: </label>
              <br />
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
              {formErrors.mobileNumber && (
                <span style={{ color: "red" }}>{formErrors.mobileNumber}</span>
              )}
            </div>
            <div className="add-employeeee-form-input-field">
              <label htmlFor="telephoneNumber">Telephone Number: </label>
              <br />
              <input
                type="text"
                id="telephoneNumber"
                name="telephoneNumber"
                value={formData.telephoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div className="add-employeeee-form-input-field">
              <label htmlFor="address">Address: </label>
              <br />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="add-employeeee-form-input-field">
              <label htmlFor="maritalStatusID">Marital Status: </label>
              <br />
              <select
                id="maritalStatusID"
                name="maritalStatusID"
                value={formData.maritalStatusID}
                onChange={handleSelectChange}
              >
                <option value="">Select marital status</option>
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

          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="personalEmail">Personal Email: </label>
              <br />
              <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleInputChange}
              />
              {formErrors.personalEmail && (
                <span style={{ color: "red" }}>{formErrors.personalEmail}</span>
              )}
            </div>
          </div>

          <h3 className="add-employee-form-h3">
            Emergency Contact Person Details:
          </h3>
          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="emergencyContactPersonName">
                Contact Person's Name:{" "}
              </label>
              <br />
              <input
                type="text"
                id="emergencyContactPersonName"
                name="emergencyContactPersonName"
                value={formData.emergencyContactPersonName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="emergencyContactPersonMobileNumber">
                Contact Person's Mobile Number:{" "}
              </label>
              <br />
              <input
                type="text"
                id="emergencyContactPersonMobileNumber"
                name="emergencyContactPersonMobileNumber"
                value={formData.emergencyContactPersonMobileNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="emergencyContactPersonAddress">
                Contact Person's Address:{" "}
              </label>
              <br />
              <input
                type="text"
                id="emergencyContactPersonAddress"
                name="emergencyContactPersonAddress"
                value={formData.emergencyContactPersonAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <h3 className="add-employee-form-h3">Official Information:</h3>
          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="designation">Designation: </label>
              <br />
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
              {formErrors.designation && (
                <span style={{ color: "red" }}>{formErrors.designation}</span>
              )}
            </div>
            <div>
              <label htmlFor="companyEmail">Company Email: </label>
              <br />
              <input
                type="text"
                id="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
              />
              {formErrors.companyEmail && (
                <span style={{ color: "red" }}>{formErrors.companyEmail}</span>
              )}
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="reportingEmployeeID">Reporting Employee: </label>
              <br />
              <select
                id="reportingEmployeeID"
                name="reportingEmployeeID"
                value={formData.reportingEmployeeID}
                onChange={handleSelectChange}
              >
                <option value="">Select Reporting Employee</option>
                {employees.map((employee) => (
                  <option key={employee.employeeID} value={employee.employeeID}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="employeeTypeID">Employee Type: </label>
              <br />
              <select
                id="employeeTypeID"
                name="employeeTypeID"
                value={formData.employeeTypeID}
                onChange={handleSelectChange}
              >
                <option value="">Select Employee Type</option>
                {employeeTypes.map((employeeType) => (
                  <option
                    key={employeeType.employeeTypeID}
                    value={employeeType.employeeTypeID}
                  >
                    {employeeType.employeeTypeName}
                  </option>
                ))}
              </select>
              {formErrors.employeeTypeID && (
                <span style={{ color: "red" }}>
                  {formErrors.employeeTypeID}
                </span>
              )}
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="roleID">Role: </label>
              <br />
              <select
                id="roleID"
                name="roleID"
                value={formData.roleID}
                onChange={handleSelectChange}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.roleID} value={role.roleID}>
                    {role.roleName}
                  </option>
                ))}
              </select>
              {formErrors.roleID && (
                <span style={{ color: "red" }}>{formErrors.roleID}</span>
              )}
            </div>
            <div>
              <label htmlFor="departmentID">Department: </label>
              <br />
              <select
                id="departmentID"
                name="departmentID"
                value={formData.departmentID}
                onChange={handleSelectChange}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option
                    key={department.departmentID}
                    value={department.departmentID}
                  >
                    {department.departmentName}
                  </option>
                ))}
              </select>
              {formErrors.departmentID && (
                <span style={{ color: "red" }}>{formErrors.departmentID}</span>
              )}
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="createdBy">Created By: </label>
              <br />
              <input
                type="text"
                id="createdBy"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="add-employee-form-dividers">
            <div>
              <label htmlFor="profileImage">Profile Image: </label>
              <br />
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageFileChange}
              />
            </div>

            <div>
              <label htmlFor="otherFile">Other File: </label>
              <br />
              <input
                type="file"
                id="otherFile"
                name="otherFile"
                onChange={handleOtherFileChange}
              />
            </div>
          </div>

          <div className="add-employee-form-button-container">
            <button type="submit" className="btn-addEmployee">
              Add Employee
            </button>
            <Link to="/employeeTable">
              <button type="button" className="add-employee-form-btn-cancel">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
