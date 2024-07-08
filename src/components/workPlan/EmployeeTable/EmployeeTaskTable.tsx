import { useState, useEffect } from "react";
import { getEmployeeTasks } from "../../../services/workPlan/TaskServices";
import { ProjectTask } from "../../../models/workPlan/ProjectTask";
import Table from "../Shared/Table";
import { FormTeam } from "../../../models/workPlan/FormTeam";
import {
  getFormProjects,
  getFormTeams,
} from "../../../services/workPlan/TaskModalServices";
import { FormProject } from "../../../models/workPlan/FormProject";

const columns = [
  { key: "taskName", header: "Task", width: 200 },
  { key: "projectName", header: "Project", width: 130 },
  { key: "teamName", header: "Team", width: 160 },
  { key: "startDate", header: "Start Date", width: 200 },
  { key: "endDate", header: "End Date", width: 200 },
  { key: "taskStatusId", header: "Progress", width: 200 },
];

const EmployeeTaskTable = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [teams, setTeams] = useState<FormTeam[]>([]);
  const [projects, setProjects] = useState<FormProject[]>([]);
  const [items, setItems] = useState<ProjectTask[]>([]);
  const [EmployeeData, setEmployeeData] = useState<ProjectTask[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEmployeeTasks();
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

    fetchTeamData();
    fetchProjectData();
    fetchData();

    return () => {
      setTasks([]);
      setTeams([]);
      setProjects([]);
    };
  }, []);

  let EmployeeId: number = 1;

  useEffect(()=>{
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
      if (element["assigned"] == true) {
        const userArray = element["selectedUsers"]
          .split(",")
          .map((user: any) => user.trim());
  
        for (let index = 0; index < userArray.length; index++) {
          if (userArray[index] == EmployeeId) {
            if (!(EmployeeData.includes(element))) {
              EmployeeData.push(element);
            }
          }
        }
      }
    });
  });

  

  return (
    <>
      <div>
        <Table
          columns={columns}
          data={EmployeeData}
          tableName="EmployeeTask"
          BodyData={EmployeeData}
        />
      </div>
    </>
  );
};

export default EmployeeTaskTable;
