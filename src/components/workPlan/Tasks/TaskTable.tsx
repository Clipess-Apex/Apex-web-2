import { useState, useEffect } from "react";
import { getTasks } from "../../../services/workPlan/TaskServices";
import { ProjectTask } from "../../../models/workPlan/ProjectTask";
import Table from "../Shared/Table";
import { FormTeam } from "../../../models/workPlan/FormTeam";
import {
  getFormProjects,
  getFormTeams,
  getFormUsers,
} from "../../../services/workPlan/TaskModalServices";
import { FormProject } from "../../../models/workPlan/FormProject";
import { FormUser } from "../../../models/workPlan/FormUser";

interface TaskTableProps {
  EmployeeId: number;
}

const columns = [
  { key: "assigned", header: " ", width: 50 },
  { key: "taskId", header: "Task ID", width: 70 },
  { key: "taskName", header: "Task", width: 200 },
  { key: "selectedEmployees", header: "Employees", width: 200 },
  { key: "projectName", header: "Project", width: 130 },
  { key: "teamName", header: "Team", width: 160 },
  { key: "startDate", header: "Start Date", width: 200 },
  { key: "endDate", header: "End Date", width: 200 },
  { key: "createdDate", header: "Created Date", width: 200 },
  { key: "updatedDate", header: "Updated Date", width: 200 },
  { key: "assignedDate", header: "Assigned Date", width: 130 },
  { key: "taskStatusId", header: "Progress", width: 130 },
  { key: "delete", header: " " },
];

const TaskTable: React.FC<TaskTableProps> = ({ EmployeeId }) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [teams, setTeams] = useState<FormTeam[]>([]);
  const [projects, setProjects] = useState<FormProject[]>([]);
  const [users, setUsers] = useState<FormUser[]>([]);
  const [items, setItems] = useState<ProjectTask[]>([]);
  const [EmployeeData, setEmployeeData] = useState<ProjectTask[]>([]);
  const [SendData, setSendData] = useState<ProjectTask[]>([]);

  useEffect(() => {
    // Fetch data when the component mounts
    async function fetchData() {
      try {
        const data = await getTasks();
        data.forEach((element: any) => {
          element["delete"] = "true";
        });
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    async function fetchTeamData() {
      try {
        const teamData = await getFormTeams();
        setTeams(teamData);
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
    fetchProjectData();
    fetchData();
    fetchUserData();

    return () => {
      setTasks([]);
      setTeams([]);
      setProjects([]);
      setUsers([]);
    };
  }, []);

  tasks.forEach((element: any) => {
    projects.forEach((data: any) => {
      if (element["projectId"] == data["projectId"]) {
        element["projectName"] = data["projectName"];
      }
    });

    teams.forEach((data: any) => {
      if (element["teamId"] == data["teamId"]) {
        element["teamName"] = data["teamName"];
      }
    });

    let EmployeeArray: string[] = [];
    const userArray = element["selectedUsers"]
      .split(",")
      .map((user: any) => user.trim());
    for (let index = 0; index < userArray.length; index++) {
      users.forEach((data: any) => {
        if (userArray[index] == data["employeeID"]) {
          EmployeeArray.push(data["firstName"] + " " + data["lastName"]);
        }
        if (userArray[index] == EmployeeId) {
          if (!EmployeeData.includes(element)) {
            EmployeeData.push(element);
          }
        }
      });
      element["selectedEmployees"] = EmployeeArray;
    }
  });
  function handleTable() {
    if (EmployeeId == 0) {
      setSendData(tasks);
    } else {
      setSendData(EmployeeData);
    }
  }

  useEffect(() => {
    handleTable();
  }, [EmployeeId, tasks, EmployeeData]);

  return (
    <div>
      <Table
        columns={columns}
        data={SendData}
        tableName="Task"
        BodyData={SendData}
      />
    </div>
  );
};

export default TaskTable;
