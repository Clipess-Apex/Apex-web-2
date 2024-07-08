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
];

const EmployeeToDoTable = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [teams, setTeams] = useState<FormTeam[]>([]);
  const [projects, setProjects] = useState<FormProject[]>([]);
  const [items, setItems] = useState<ProjectTask[]>([]);
  const [EmployeeTaskData, setEmployeeTaskData] = useState<ProjectTask[]>([]);
  const [EmployeeToDoData, setEmployeeToDoData] = useState<ProjectTask[]>([]);
  let EmployeeId: number = 1;

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
        if (!(items.includes(element))) {
          items.push(element);
        }
      }
    });
  
    items.forEach((element: any) => {
      const userArray = element["selectedUsers"]
        .split(",")
        .map((user: any) => user.trim());
  
      for (let index = 0; index < userArray.length; index++) {
        if (userArray[index] == EmployeeId) {
          if (!(EmployeeTaskData.includes(element))) {
            EmployeeTaskData.push(element);
          }
        }
      }
    });
  
    console.log("called");
    EmployeeTaskData.forEach((data: any) => {
      if (data["taskStatusId"] == 1) {
        if (!(EmployeeToDoData.includes(data))) {
          EmployeeToDoData.push(data);
        }
      }
    });
  });

 

  return (
    <>
      <div>
        <Table
          columns={columns}
          data={EmployeeToDoData}
          tableName="EmployeeToDo"
          BodyData={EmployeeToDoData}
        />
      </div>
    </>
  );
};

export default EmployeeToDoTable;
