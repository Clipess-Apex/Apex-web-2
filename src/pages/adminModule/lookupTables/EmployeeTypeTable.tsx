import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/adminModule/AdminLookupTables.css";

interface EmployeeType {
  employeeTypeID: number;
  employeeTypeName: string;
  deleted: boolean;
}

const EmployeeTypeTable: React.FC = () => {
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [employeeTypeToRemove, setEmployeeTypeToRemove] = useState<EmployeeType | null>(null);
  const [employeeTypeToEdit, setEmployeeTypeToEdit] = useState<EmployeeType | null>(null);
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [newEmployeeType, setNewEmployeeType] = useState<EmployeeType>({
    employeeTypeID: 0,
    employeeTypeName: "",
    deleted: false,
  });

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get<EmployeeType[]>(
          "https://localhost:7166/api/employeeType/getEmployeeType"
        );
        const data = Array.isArray(response.data) ? response.data : [];
        const filteredEmployeeTypes = data.filter((employeeType: EmployeeType) => !employeeType.deleted);
        setEmployeeTypes(filteredEmployeeTypes);
      } catch (err) {
        setError("Error fetching EmployeeTypes");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeTypes();
  }, []);

  const handleRemoveClick = (employeeType: EmployeeType) => {
    setEmployeeTypeToRemove(employeeType);
    setShowRemovePopup(true);
  };

  const confirmRemove = async () => {
    if (employeeTypeToRemove) {
      try {
        const updateData = {
          ...employeeTypeToRemove,
          deleted: true,
        };
        const response = await axios.put(
          `https://localhost:7166/api/employeeType/updateDeleteStatus/${employeeTypeToRemove.employeeTypeID}`,
          updateData
        );
        if (response.status === 200) {
          setEmployeeTypes(employeeTypes.filter((et) => et.employeeTypeID !== employeeTypeToRemove.employeeTypeID));
          alert("Employee type status updated to deleted successfully.");
        } else {
          throw new Error("Failed to update employee type delete status");
        }
        setShowRemovePopup(false);
        setEmployeeTypeToRemove(null);
      } catch (err) {
        setError("Error removing employee type");
      }
    }
  };

  const cancelRemove = () => {
    setShowRemovePopup(false);
    setEmployeeTypeToRemove(null);
  };

  const handleEditClick = (employeeType: EmployeeType) => {
    setEmployeeTypeToEdit(employeeType);
    setShowEditPopup(true);
  };

  const confirmEdit = async (updatedEmployeeType: EmployeeType) => {
    try {
      const response = await axios.put(
        `https://localhost:7166/api/employeeType/updateEmployeeType/${updatedEmployeeType.employeeTypeID}`,
        updatedEmployeeType
      );
      if (response.status === 200) {
        setEmployeeTypes(employeeTypes.map((et) => (et.employeeTypeID === updatedEmployeeType.employeeTypeID ? updatedEmployeeType : et)));
        alert("Employee type updated successfully.");
      } else {
        throw new Error("Failed to update employee type");
      }
      setShowEditPopup(false);
      setEmployeeTypeToEdit(null);
    } catch (err) {
      setError("Error updating employee type");
    }
  };

  const cancelEdit = () => {
    setShowEditPopup(false);
    setEmployeeTypeToEdit(null);
  };

  const handleAddClick = () => {
    setShowAddPopup(true);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployeeType((prevET) => ({
      ...prevET,
      [name]: value,
    }));
  };

  const confirmAdd = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7166/api/employeeType/addEmployeeType",
        newEmployeeType
      );
      if (response.status === 200) {
        alert("Employee type added successfully.");
        setNewEmployeeType({ employeeTypeID: 0, employeeTypeName: "", deleted: false });
        setShowAddPopup(false);
        // await fetchEmployeeTypes();  // Re-fetch employee types from the server
      } else {
        throw new Error("Failed to add employee type");
      }
    } catch (err) {
      setError("Error adding employee type");
    } finally {
      setLoading(false);
    }
  };

  const cancelAdd = () => {
    setShowAddPopup(false);
    setNewEmployeeType({ employeeTypeID: 0, employeeTypeName: "", deleted: false });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="lookup-table-container">
      <div
        className="admin-add-btn"
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center", 
        }}
      >
        <button className="admin-btn-add" onClick={handleAddClick}>
          ADD Employee Type +
        </button>
      </div>
      <table className="admin-lookup-table">
        <thead>
          <tr>
            <th>Employee Type ID</th>
            <th>Employee Type Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeTypes.map((employeeType) => (
            <tr key={employeeType.employeeTypeID}>
              <td>{employeeType.employeeTypeID}</td>
              <td>{employeeType.employeeTypeName}</td>
              <td>
                <button className="btn-lookup-edit" onClick={() => handleEditClick(employeeType)}>
                  Edit
                </button>
                &emsp;
                <button className="btn-lookup-remove" onClick={() => handleRemoveClick(employeeType)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showRemovePopup && (
        <div className="admin-popup">
          <div className="admin-popup-inner">
            <h2>Confirm Remove</h2>
            <p>Are you sure you want to remove the employee type "{employeeTypeToRemove?.employeeTypeName}"?</p>
            <button className="lookup-row-delete" onClick={confirmRemove}>Delete</button>&emsp;&emsp;&emsp;
            <button className="lookup-row-delete-cancel" onClick={cancelRemove}>Cancel</button>
          </div>
        </div>
      )}

      {showEditPopup && employeeTypeToEdit && (
        <EditPopup employeeType={employeeTypeToEdit} onConfirm={confirmEdit} onCancel={cancelEdit} />
      )}

      {showAddPopup && (
        <div className="admin-popup">
          <div className="admin-popup-inner">
            <h2>Add Employee Type</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmAdd();
              }}
            >
              <label>
                Employee Type Name:
                <input
                  type="text"
                  name="employeeTypeName"
                  value={newEmployeeType.employeeTypeName}
                  onChange={handleAddChange}
                />
              </label>
              <div className="lookup-edit-control-button-container">
                <button type="submit">Save</button>&emsp;&emsp;&emsp;
                <button type="button" onClick={cancelAdd}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface EditPopupProps {
  employeeType: EmployeeType;
  onConfirm: (updatedEmployeeType: EmployeeType) => void;
  onCancel: () => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ employeeType, onConfirm, onCancel }) => {
  const [updatedEmployeeType, setUpdatedEmployeeType] = useState<EmployeeType>({ ...employeeType });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEmployeeType(prevEmployeeType => ({
      ...prevEmployeeType,
      [name]: value,
    }));
  };

  return (
    <div className="admin-popup">
      <div className="admin-popup-inner">
        <h2>Edit Employee Type</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(updatedEmployeeType);
          }}
        >
          <label>
            Employee Type ID:
            <input
              type="text"
              name="employeeTypeID"
              value={updatedEmployeeType.employeeTypeID}
              disabled
            />
          </label>
          <label>
            Employee Type Name:
            <input
              type="text"
              name="employeeTypeName"
              value={updatedEmployeeType.employeeTypeName}
              onChange={handleChange}
            />
          </label>
          <div className="lookup-edit-button-container">
            <button type="submit">Save</button>&emsp;&emsp;&emsp;
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeTypeTable;
