import { useEffect, useState } from "react";
import TaskTable from "../../../components/workPlan/Tasks/TaskTable";
import AddButton from "../../../components/workPlan/Shared/AddButton";
import TaskModal from "../../../components/workPlan/Tasks/TaskModal";
import BackButton from "../../../components/workPlan/Shared/BackButton";
import ViewButton from "../../../components/workPlan/Shared/ViewButton";
import TaskReportPopup from "../../../components/workPlan/TaskPdfGeneration/TaskReportPopup";
import { getFormUsers } from "../../../services/workPlan/TaskModalServices";
import { FormUser } from "../../../models/workPlan/FormUser";
import "../../../styles/workPlan/TaskView.css";

const TaskView = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewReport, setOpenViewReport] = useState(false);
  const [EmployeeId, setEmployeeId] = useState(0);
  const [users, setUsers] = useState<FormUser[]>([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenViewReport = () => {
    setOpenViewReport(true);
  };

  const handleCloseViewReport = () => {
    setOpenViewReport(false);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getFormUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchUserData();

    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <>
      <ViewButton
        buttonText={"Generate Task Report"}
        onClick={handleOpenViewReport}
      />
      <AddButton buttonText="+ ADD TASK" onClick={handleOpenDialog} />
      <div className="TaskView">
        <div className="form-container">
          <form className="modal-form">
            <label>Select Employee : </label>
            <select
              onChange={(event) => setEmployeeId(parseInt(event.target.value))}
            >
              <option> Select a Employee </option>
              {users.map((user) => (
                <option key={user.employeeID} value={user.employeeID}>
                  {user.firstName + " " + user.lastName}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <TaskTable EmployeeId={EmployeeId} />
      <TaskReportPopup open={openViewReport} onClose={handleCloseViewReport} />
      <TaskModal open={openDialog} onClose={handleCloseDialog} />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default TaskView;
