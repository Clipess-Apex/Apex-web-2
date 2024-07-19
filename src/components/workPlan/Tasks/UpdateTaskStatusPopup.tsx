import React from "react";
import "../../../styles/workPlan/Popup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateTaskStatus } from "../../../services/workPlan/TaskServices";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  BodyData: any;
}

const UpdateTaskStatusPopup: React.FC<ModalProps> = ({
  open,
  onClose,
  BodyData,
}) => {
  const handleUpdate = async () => {
    try {
      await updateTaskStatus(BodyData.taskId, BodyData);
      toast.success("Task Status has been updated");
      refreshPage();
    } catch (error) {
      toast.error("Error updating Task Status");
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
          Are you sure to Update Task Status ?
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

export default UpdateTaskStatusPopup;
