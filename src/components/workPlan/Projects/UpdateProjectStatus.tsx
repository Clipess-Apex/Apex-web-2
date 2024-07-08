import React from "react";
import "../../../styles/workPlan/Popup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateProjectStatus } from "../../../services/workPlan/ProjectServices";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  BodyData: any;
}

const UpdateProjectStatusPopup: React.FC<ModalProps> = ({
  open,
  onClose,
  BodyData,
}) => {
  const handleUpdate = async () => {
    try {
      await UpdateProjectStatus(BodyData.projectId, BodyData);
      toast.success("Project Status has been updated");
      refreshPage();
    } catch (error) {
      toast.error("Error updating Project Status");
    }
  };

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
    
    <div className="TaskModal">
      {open && <div className="popup-overlay" onClick={onClose}></div>}
      
      <dialog id="modal" open={open} onClose={onClose} className="popup-modal">
        <div className="popup-modal-title">
          Are you sure to Update the Status ?
        </div>
        <br></br>
        <div className="popup-modal-button">
          <button onClick={onClose} className="popup-modal-cancel">
            No
          </button>
          <button onClick={handleUpdate} className="popup-modal-done">
            Yes
          </button>
        </div>
      </dialog>
      </div>
    </>
  );
};

export default UpdateProjectStatusPopup;
