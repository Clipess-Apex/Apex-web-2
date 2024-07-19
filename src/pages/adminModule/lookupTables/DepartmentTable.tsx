import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/adminModule/AdminLookupTables.css";
import { toast } from "react-toastify";

interface Department {
  departmentID: number;
  departmentName: string;
  deleted: boolean;
}

const DepartmentTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [departmentToRemove, setDepartmentToRemove] =
    useState<Department | null>(null);
  const [departmentToEdit, setDepartmentToEdit] = useState<Department | null>(
    null
  );
  const [newDepartment, setNewDepartment] = useState<Department>({
    departmentID: 0,
    departmentName: "",
    deleted: false,
  });

  const fetchDepartments = async () => {
    try {
      const response = await axios.get<Department[]>(
        "https://localhost:7166/api/department/getDepartment"
      );
      const data = Array.isArray(response.data) ? response.data : [];
      const filteredDepartments = data.filter(
        (dept: Department) => !dept.deleted
      );
      setDepartments(filteredDepartments);
    } catch (err) {
      setError("Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleRemoveClick = (dept: Department) => {
    setDepartmentToRemove(dept);
    setShowRemovePopup(true);
  };

  const confirmRemove = async () => {
    if (departmentToRemove) {
      try {
        const updateData = {
          ...departmentToRemove,
          deleted: true,
        };
        const response = await axios.put(
          `https://localhost:7166/api/department/updateDeleteStatus/${departmentToRemove.departmentID}`,
          updateData
        );
        if (response.status === 200) {
          setDepartments(
            departments.filter(
              (dept) => dept.departmentID !== departmentToRemove.departmentID
            )
          );
          toast.success("Department status updated to deleted successfully.");
        } else {
          throw new Error("Failed to update department delete status");
        }
        setShowRemovePopup(false);
        setDepartmentToRemove(null);
      } catch (err) {
        setError("Error removing department");
      }
    }
  };

  const cancelRemove = () => {
    setShowRemovePopup(false);
    setDepartmentToRemove(null);
  };

  const handleEditClick = (dept: Department) => {
    setDepartmentToEdit(dept);
    setShowEditPopup(true);
  };

  const confirmEdit = async (updatedDept: Department) => {
    try {
      const response = await axios.put(
        `https://localhost:7166/api/department/updateDepartment/${updatedDept.departmentID}`,
        updatedDept
      );
      if (response.status === 200) {
        setDepartments(
          departments.map((dept) =>
            dept.departmentID === updatedDept.departmentID ? updatedDept : dept
          )
        );
        toast.success("Department updated successfully.");
      } else {
        throw new Error("Failed to update department");
      }
      setShowEditPopup(false);
      setDepartmentToEdit(null);
    } catch (err) {
      setError("Error updating department");
    }
  };

  const cancelEdit = () => {
    setShowEditPopup(false);
    setDepartmentToEdit(null);
  };

  const handleAddClick = () => {
    setShowAddPopup(true);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDepartment((prevDept) => ({
      ...prevDept,
      [name]: value,
    }));
  };

  const confirmAdd = async () => {
    if (departments.some(department => department.departmentName === newDepartment.departmentName)) {
      toast.error("Department already exists.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7166/api/department/addDepartment",
        newDepartment
      );
      if (response.status === 200) {
        toast.success("Department added successfully.");
        setNewDepartment({
          departmentID: 0,
          departmentName: "",
          deleted: false,
        });
        setShowAddPopup(false);
        await fetchDepartments(); // Re-fetch the departments from the server
      } else {
        throw new Error("Failed to add department");
      }
    } catch (err) {
      setError("Error adding department");
    } finally {
      setLoading(false);
    }
  };

  const cancelAdd = () => {
    setShowAddPopup(false);
    setNewDepartment({ departmentID: 0, departmentName: "", deleted: false });
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
        className="add-btn"
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button className="admin-btn-add" onClick={handleAddClick}>
          ADD Department +
        </button>
      </div>
      <table className="admin-lookup-table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.departmentID}>
              <td>{dept.departmentID}</td>
              <td>{dept.departmentName}</td>
              <td>
                <button
                  className="btn-lookup-edit"
                  onClick={() => handleEditClick(dept)}
                >
                  Edit
                </button>
                &emsp;
                <button
                  className="btn-lookup-remove"
                  onClick={() => handleRemoveClick(dept)}
                >
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
            <p>
              Are you sure you want to remove the department "
              {departmentToRemove?.departmentName}
              "?
            </p>
            <button className="lookup-row-delete" onClick={confirmRemove}>
              Delete
            </button>
            &emsp;&emsp;&emsp;
            <button className="lookup-row-delete-cancel" onClick={cancelRemove}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showEditPopup && departmentToEdit && (
        <EditPopup
          department={departmentToEdit}
          onConfirm={confirmEdit}
          onCancel={cancelEdit}
        />
      )}

      {showAddPopup && (
        <div className="admin-popup">
          <div className="admin-popup-inner">
            <h2>Add Department</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmAdd();
              }}
            >
              <label>
                Department Name:
                <input
                  type="text"
                  name="departmentName"
                  value={newDepartment.departmentName}
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
  department: Department;
  onConfirm: (updatedDept: Department) => void;
  onCancel: () => void;
}

const EditPopup: React.FC<EditPopupProps> = ({
  department,
  onConfirm,
  onCancel,
}) => {
  const [updatedDepartment, setUpdatedDepartment] = useState<Department>({
    ...department,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedDepartment((prevDept) => ({
      ...prevDept,
      [name]: value,
    }));
  };

  return (
    <div className="admin-popup">
      <div className="admin-popup-inner">
        <h2>Edit Department</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(updatedDepartment);
          }}
        >
          <label>
            Department ID:
            <input
              type="text"
              name="departmentID"
              value={updatedDepartment.departmentID}
              disabled
            />
          </label>
          <label>
            Department Name:
            <input
              type="text"
              name="departmentName"
              value={updatedDepartment.departmentName}
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

export default DepartmentTable;
