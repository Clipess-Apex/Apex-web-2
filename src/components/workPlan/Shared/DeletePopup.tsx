import React from "react";
import "../../../styles/workPlan/Popup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteClient } from "../../../services/workPlan/ClientServices";
import { deleteProject } from "../../../services/workPlan/ProjectServices";
import { deleteTask } from "../../../services/workPlan/TaskServices";
import { deleteTeam } from "../../../services/workPlan/TeamServices";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  BodyData: any;
  tableName: string;
}

const DeletePopup: React.FC<ModalProps> = ({
  open,
  onClose,
  BodyData,
  tableName,
}) => {
  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleDelete = async () => {
    try {
      switch (tableName) {
        case "Project":
          await deleteProject(BodyData.projectId);
          toast.success("Project has been deleted");
          break;
        case "Team":
          await deleteTeam(BodyData.teamId);
          toast.success("Team has been deleted");
          break;
        case "Client":
          await deleteClient(BodyData.clientId);
          toast.success("Client has been deleted");
          break;
        case "Task":
          await deleteTask(BodyData.taskId);
          toast.success("Task has been deleted");
          break;
        default:
          break;
      }
      refreshPage();
    } catch (error) {
      toast.error("Error deleting " + { tableName });
      console.error("Error deleting " + { tableName }, error);
    }
  };
  return (
    <>
    <div className="TaskModal">
      {open && <div className="popup-overlay" onClick={onClose}></div>}
      
      <dialog id="modal" open={open} onClose={onClose} className="popup-modal">
        <div className="popup-modal-title">Are you sure to Delete ?</div>
        <br></br>
        <div className="popup-modal-button">
          <button onClick={onClose} className="popup-modal-cancel">
            No
          </button>
          <button onClick={handleDelete} className="popup-modal-done">
            Yes
          </button>
        </div>
      </dialog>
      </div>
    </>
  );
};

export default DeletePopup;
