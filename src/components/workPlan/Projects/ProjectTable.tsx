import { useState, useEffect } from "react";
import { getProjects } from "../../../services/workPlan/ProjectServices";
import { Project } from "../../../models/workPlan/Project";
import Table from "../Shared/Table";
import { FormClient } from "../../../models/workPlan/FormClient";
import { getFormClients } from "../../../services/workPlan/TaskModalServices";

const columns = [
  { key: "projectId", header: "Project ID" },
  { key: "projectName", header: "Project Name" },
  { key: "clientName", header: "Client Name" },
  { key: "startDate", header: "Start Date", width: 200 },
  { key: "endDate", header: "End Date", width: 200 },
  { key: "description", header: "Description" },
  { key: "budget", header: "Budget" },
  { key: "createdDate", header: "Created Date", width: 200 },
  { key: "updatedDate", header: "Updated Date", width: 200 },
  { key: "documentURL", header: "Document URL" },
  { key: "projectStatusId", header: "Status" },
  { key: "delete", header: " " },
];

const ProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<FormClient[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();
        setProjects(data);
        data.forEach((element: any) => {
          element["delete"] = "true";
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
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

    fetchClientData();
    fetchData();

    return () => {
      setProjects([]);
      setClients([]);
    };
  }, []);

  projects.forEach((element: any) => {
    clients.forEach((data: any) => {
      if (element["clientId"] === data["clientId"]) {
        element["clientName"] = data["clientName"];
      }
    });
  });

  return (
    <div>
      <Table
        columns={columns}
        data={projects}
        tableName="Project"
        BodyData={projects}
      />
    </div>
  );
};

export default ProjectTable;
