import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/adminModule/AdminLookupTables.css";
import { toast } from "react-toastify";

interface Role {
  roleID: number;
  roleName: string;
  deleted: boolean;
}

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showRemovePopup, setShowRemovePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [roleToRemove, setRoleToRemove] = useState<Role | null>(null);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<Role>({
    roleID: 0,
    roleName: "",
    deleted: false,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<Role[]>(
          "https://localhost:7166/api/role/getRole"
        );
        const data = Array.isArray(response.data) ? response.data : [];
        const filteredRoles = data.filter((role: Role) => !role.deleted);
        setRoles(filteredRoles);
      } catch (err) {
        setError("Error fetching roles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleRemoveClick = (role: Role) => {
    setRoleToRemove(role);
    setShowRemovePopup(true);
  };

  const confirmRemove = async () => {
    if (roleToRemove) {
      try {
        const updateData = {
          ...roleToRemove,
          deleted: true,
        };
        const response = await axios.put(
          `https://localhost:7166/api/role/UpdateDeleteStatus/${roleToRemove.roleID}`,
          updateData
        );
        if (response.status === 200) {
          setRoles(
            roles.filter((role) => role.roleID !== roleToRemove.roleID)
          );
          toast.success("Role status updated to deleted successfully.");
        } else {
          throw new Error("Failed to update role delete status");
        }
        setShowRemovePopup(false);
        setRoleToRemove(null);
      } catch (err) {
        setError("Error removing role");
      }
    }
  };

  const cancelRemove = () => {
    setShowRemovePopup(false);
    setRoleToRemove(null);
  };

  const handleEditClick = (role: Role) => {
    setRoleToEdit(role);
    setShowEditPopup(true);
  };

  const confirmEdit = async (updatedRole: Role) => {
    try {
      const response = await axios.put(
        `https://localhost:7166/api/role/updateRole/${updatedRole.roleID}`,
        updatedRole
      );
      if (response.status === 200) {
        setRoles(
          roles.map((role) =>
            role.roleID === updatedRole.roleID ? updatedRole : role
          )
        );
        toast.success("Role updated successfully.");
      } else {
        throw new Error("Failed to update role");
      }
      setShowEditPopup(false);
      setRoleToEdit(null);
    } catch (err) {
      setError("Error updating role");
    }
  };

  const cancelEdit = () => {
    setShowEditPopup(false);
    setRoleToEdit(null);
  };

  const handleAddClick = () => {
    setShowAddPopup(true);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));
  };

  const confirmAdd = async () => {
    if (roles.some(role => role.roleName === newRole.roleName)) {
      toast.error("Role already exists.");
      return;
    }
    
    try {
      const response = await axios.post(
        "https://localhost:7166/api/role/addRole",
        newRole
      );
      if (response.status === 200) {
        toast.success("Role added successfully.");
        setNewRole({ roleID: 0, roleName: "", deleted: false });
        setShowAddPopup(false);
        await fetchRoles();
      } else {
        throw new Error("Failed to add role");
      }
    } catch (err) {
      setError("Error adding role");
    }
  };

  // Add fetchRoles function to re-fetch roles from the server
  const fetchRoles = async () => {
    try {
      const response = await axios.get<Role[]>(
        "https://localhost:7166/api/role/getRole"
      );
      const data = Array.isArray(response.data) ? response.data : [];
      const filteredRoles = data.filter((role: Role) => !role.deleted);
      setRoles(filteredRoles);
    } catch (err) {
      setError("Error fetching roles");
    } finally {
      setLoading(false);
    }
  };

  // Use fetchRoles in useEffect to load roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const cancelAdd = () => {
    setShowAddPopup(false);
    setNewRole({ roleID: 0, roleName: "", deleted: false });
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
          //   margin: "auto",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          //paddingLeft: "100px",
        }}
      >
        <button className="admin-btn-add" onClick={handleAddClick}>
          ADD Role +
        </button>
      </div>
      <table className="admin-lookup-table">
        <thead>
          <tr>
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.roleID}>
              <td>{role.roleID}</td>
              <td>{role.roleName}</td>
              <td>
                <button
                  className="btn-lookup-edit"
                  onClick={() => handleEditClick(role)}
                >
                  Edit
                </button>
                &emsp;
                <button
                  className="btn-lookup-remove"
                  onClick={() => handleRemoveClick(role)}
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
              Are you sure you want to remove the role "{roleToRemove?.roleName}
              "?
            </p>
            <div className="delete-model-button-container">
            <button className="lookup-row-delete" onClick={confirmRemove}>Delete</button>&emsp;&emsp;&emsp;
            <button className="lookup-row-delete-cancel" onClick={cancelRemove}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && roleToEdit && (
        <EditPopup
          role={roleToEdit}
          onConfirm={confirmEdit}
          onCancel={cancelEdit}
        />
      )}

      {showAddPopup && (
        <div className="admin-popup">
          <div className="admin-popup-inner">
            <h2>Add Role</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmAdd();
              }}
            >
              
              <label>
                Role Name:
                <input
                  type="text"
                  name="roleName"
                  value={newRole.roleName}
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
  role: Role;
  onConfirm: (updatedRole: Role) => void;
  onCancel: () => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ role, onConfirm, onCancel }) => {
  const [updatedRole, setUpdatedRole] = useState<Role>({ ...role });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));
  };

  return (
    <div className="admin-popup">
      <div className="admin-popup-inner">
        <h2>Edit Role</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(updatedRole);
          }}
        >
          <label>
            Role ID:
            <input
              type="text"
              name="roleID"
              value={updatedRole.roleID}
              disabled
            />
          </label>
          <label>
            Role Name:
            <input
              type="text"
              name="roleName"
              value={updatedRole.roleName}
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

export default RoleTable;
