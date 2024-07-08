import React from "react";
import "../../styles/adminModule/EditButton.css";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <>
      <button className="admin-btn-edit" onClick={onClick}>
        Edit Employee
      </button>
    </>
  );
};

export default EditButton;
