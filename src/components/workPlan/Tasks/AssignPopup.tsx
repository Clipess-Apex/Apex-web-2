import React, { useState, useEffect } from "react";
import "../../../styles/workPlan/Popup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assignTask, getTasks } from "../../../services/workPlan/TaskServices";
import { ProjectTask } from "../../../models/workPlan/ProjectTask";
import { createTaskNotification } from "../../../services/workPlan/NotificationServices";
import { TaskNotification } from "../../../models/workPlan/TaskNotification";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  BodyData: any;
}

const AssignPopup: React.FC<ModalProps> = ({ open, onClose, BodyData }) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [notificationId, setNotificationId] = useState(1);
  const [userArray, setUserArray] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchData();

    return () => {
      setTasks([]);
    };
  }, []);

  const handleAssign = async () => {
    BodyData.assigned = true;
    try {
      await assignTask(BodyData.taskId, BodyData);

      const repsonse = await createTaskNotification(
        notificationId,
        BodyData.selectedUsers
      );
      toast.success("Task has been assigned");
      refreshPage();
    } catch (error) {
      toast.error("Error assigning task");
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

        <dialog
          id="modal"
          open={open}
          onClose={onClose}
          className="popup-modal"
        >
          <div className="popup-modal-title">Are you sure to Assign ?</div>
          <br></br>
          <div className="popup-modal-button">
            <button onClick={onClose} className="popup-modal-cancel">
              No
            </button>
            <button onClick={handleAssign} className="popup-modal-done">
              Yes
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AssignPopup;
