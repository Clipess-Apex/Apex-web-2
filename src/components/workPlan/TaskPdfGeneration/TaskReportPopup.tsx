import React, { useState, useEffect } from "react";
import "../../../styles/workPlan/Popup.css";
import "react-toastify/dist/ReactToastify.css";
import { getEmployeeTasks } from "../../../services/workPlan/TaskServices";
import { ProjectTask } from "../../../models/workPlan/ProjectTask";
import { generateTaskReportPdf } from "../../../services/workPlan/TaskPdfGenerationServices";
import { FormUser } from "../../../models/workPlan/FormUser";
import { getFormUsers } from "../../../services/workPlan/TaskModalServices";
import { TaskReportRequest } from "../../../models/workPlan/TaskReportRequest";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const TaskReportPopup: React.FC<ModalProps> = ({ open, onClose }) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [items, setItems] = useState<ProjectTask[]>([]);
  const [taskData, setTaskData] = useState<number[]>([]);
  const [employeeId, setEmployeeId] = useState(0);
  const [users, setUsers] = useState<FormUser[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEmployeeTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    async function fetchUserData() {
      try {
        const userData = await getFormUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchUserData();
    fetchData();

    return () => {
      setTasks([]);
      setUsers([]);
    };
  }, []);

  tasks.forEach((element: any) => {
    if (element["assigned"] == true) {
      if (!items.includes(element)) {
        items.push(element);
      }
    }
  });

  const handlePDFGeneration = async () => {
    const url = generateTaskReportPdf(employeeId);
    window.open(await url, "_blank");
  };

  return (
    <>
      {open && <div className="popup-overlay" onClick={onClose}></div>}
      <div className="TaskModal">
        <dialog
          id="modal"
          open={open}
          onClose={onClose}
          className="popup-modal"
        >
          <div className="popup-modal-title">Generate Task Report</div>
          <br></br>
          <div className="form-container">
            <form className="modal-form">
              <label>Select Employee : </label>
              <select
                onChange={(event) =>
                  setEmployeeId(parseInt(event.target.value))
                }
              >
                {users.map((user) => (
                  <option key={user.employeeID} value={user.employeeID}>
                    {user.firstName + " " + user.lastName}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <br></br>
          <div className="popup-modal-button">
            <button
              onClick={handlePDFGeneration}
              className="popup-modal-donePDF"
            >
              View Task Report
            </button>
            <button onClick={onClose} className="popup-modal-cancel">
              Close
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default TaskReportPopup;
