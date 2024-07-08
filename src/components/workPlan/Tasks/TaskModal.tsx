import React, { useState, useEffect, ChangeEvent } from "react";
import { postTask } from "../../../services/workPlan/TaskServices";
import { object, string, date } from "yup";
import "../../../styles/workPlan/Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormTeam } from "../../../models/workPlan/FormTeam";
import {
  getFormClients,
  getFormProjects,
  getFormTeams,
  getFormUsers,
} from "../../../services/workPlan/TaskModalServices";
import { FormClient } from "../../../models/workPlan/FormClient";
import { FormProject } from "../../../models/workPlan/FormProject";
import { FormUser } from "../../../models/workPlan/FormUser";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const [ProjectId, setProjectId] = useState("");
  const [Task, setTask] = useState("");
  const [TeamId, setTeamId] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [teams, setTeams] = useState<FormTeam[]>([]);
  const [clients, setClients] = useState<FormClient[]>([]);
  const [projects, setProjects] = useState<FormProject[]>([]);
  const [users, setUsers] = useState<FormUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const taskSchema = object({
    taskName: string().required("Task Name is required"),
    projectId: string().required("Project is required"),
    teamId: string().required("Team is required"),
    startDate: date().default(() => new Date()),
    endDate: date().default(() => new Date()),
  });

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const teamData = await getFormTeams();
        setTeams(teamData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    async function fetchClientData() {
      try {
        const clientData = await getFormClients();
        setClients(clientData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    async function fetchProjectData() {
      try {
        const projectData = await getFormProjects();
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching teams:", error);
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

    fetchTeamData();
    fetchClientData();
    fetchProjectData();
    fetchUserData();

    return () => {
      setTeams([]);
      setClients([]);
      setProjects([]);
      setUsers([]);
    };
  }, []);

  const selectedUsersString = selectedUsers.join(", ");

  const taskData = {
    taskName: Task,
    teamId: TeamId,
    startDate: StartDate,
    endDate: EndDate,
    projectId: ProjectId,
    assigned: false,
    deleted: false,
    selectedUsers: selectedUsersString,
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await taskSchema.validate(taskData, { abortEarly: false });
      await postTask(taskData);
      await toast.success("Task has been added");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.errors.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error("Error adding Task");
      }
      console.error("Error adding Task:", error);
    }
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;

    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
        if (!selectedOptions.includes(options[i].value)) {
          selectedOptions.push(options[i].value);
        }
      }
    }
    setSelectedUsers(selectedValues);
  };

  return (
    <>
      <div className="TaskModal">
        {open && <div className="overlay" onClick={onClose}></div>}

        <dialog id="modal" open={open} onClose={onClose} className="modal">
          <div className="modal-title">Add Task</div>
          <br></br>
          <div className="form-container">
            <form className="modal-form">
              <label>Task :</label>
              <input
                type="text"
                value={Task}
                onChange={(event) => setTask(event.target.value)}
              />

              <label>Employees : </label>
              <select multiple onChange={handleSelect} className="userSelect">
                {users.map((user) => (
                  <option key={user.employeeID} value={user.employeeID}>
                    {user.firstName + " " + user.lastName}
                  </option>
                ))}
              </select>

              <label>Project : </label>
              <select onChange={(event) => setProjectId(event.target.value)}>
                <option value="">Select a Project</option>
                {projects.map((project) => (
                  <option key={project.projectId} value={project.projectId}>
                    {project.projectName}
                  </option>
                ))}
              </select>

              <label>Team :</label>
              <select onChange={(event) => setTeamId(event.target.value)}>
                <option value="">Select a Team</option>
                {teams.map((team) => (
                  <option key={team.teamId} value={team.teamId}>
                    {team.teamName}
                  </option>
                ))}
              </select>

              <label>Start Date :</label>
              <input
                type="date"
                value={StartDate}
                onChange={(event) => setStartDate(event.target.value)}
              />

              <label>End Date :</label>
              <input
                type="date"
                value={EndDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
              <br />
              <div className="modal-button">
                <button onClick={onClose} className="modal-cancel">
                  Cancel
                </button>
                <button onClick={handleSave} className="modal-done">
                  Done
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default TaskModal;
