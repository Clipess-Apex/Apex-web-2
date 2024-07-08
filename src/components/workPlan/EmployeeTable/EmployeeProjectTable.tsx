import { useState, useEffect } from "react";
import { getEmployeeTasks } from "../../../services/workPlan/TaskServices";
import { ProjectTask } from "../../../models/workPlan/ProjectTask";
import Table from "../Shared/Table";
import { getFormClients } from "../../../services/workPlan/TaskModalServices";
import { FormClient } from "../../../models/workPlan/FormClient";
import { FormProject } from "../../../models/workPlan/FormProject";
import { getProjects } from "../../../services/workPlan/ProjectServices";
import { Project } from "../../../models/workPlan/Project";

const columns = [
  { key: "projectName", header: "Project Name" },
  { key: "clientName", header: "Client Name" },
  { key: "startDate", header: "Start Date", width: 200 },
  { key: "endDate", header: "End Date", width: 200 },
  { key: "description", header: "Description" },
  { key: "documentURL", header: "Document URL" },
];

const EmployeeProjectTable = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [projects, setProjects] = useState<FormProject[]>([]);
  const [clients, setClients] = useState<FormClient[]>([]);
  const [EmployeeProjectData, setEmployeeProjectData] = useState<ProjectTask[]>(
    []
  );
  const [EmployeeTaskData, setEmployeeTaskData] = useState<ProjectTask[]>([]);
  const [items, setItems] = useState<ProjectTask[]>([]);
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

    async function fetchProjectData() {
      try {
        const projectData = await getProjects();
        setProjects(projectData);
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

    fetchProjectData();
    fetchClientData();
    fetchData();

    return () => {
      setTasks([]);
      setProjects([]);
      setClients([]);
    };
  }, []);

  useEffect(()=>{
    tasks.forEach((element: any) => {
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
  
    EmployeeTaskData.forEach((userData: any) => {
      projects.forEach((data: any) => {
        if (userData["projectId"] == data["projectId"]) {
          if (!(EmployeeProjectData.includes(data))) {
            EmployeeProjectData.push(data);
          }
        }
      });
    });
  
    EmployeeProjectData.forEach((element: any) => {
      clients.forEach((data: any) => {
        if (element["clientId"] == data["clientId"]) {
          element["clientName"] = data["clientName"];
        }
      });
    });
  });

  

  return (
    <>
      <div>
        <Table
          columns={columns}
          data={EmployeeProjectData}
          tableName="EmployeeProject"
          BodyData={EmployeeProjectData}
        />
      </div>
    </>
  );
};

export default EmployeeProjectTable;
