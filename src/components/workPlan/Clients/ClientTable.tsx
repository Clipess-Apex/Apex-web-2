import { useState, useEffect } from "react";
import { getClients } from "../../../services/workPlan/ClientServices";
import { Client } from "../../../models/workPlan/Client";
import Table from "../Shared/Table";

const columns = [
  { key: "clientId", header: "Client ID" },
  { key: "clientName", header: "Client Name" },
  { key: "telephoneNo", header: "Telephone No" },
  { key: "address", header: "Address" },
  { key: "email", header: "Email" },
  { key: "createdDate", header: "Created Date" },
  { key: "updatedDate", header: "Updated Date" },
  { key: "delete", header: " " },
];

const ClientTable = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClients();
        setClients(data);
        data.forEach((element: any) => {
          element["delete"] = "true";
        });
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    }

    fetchData();

    return () => {
      setClients([]);
    };
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={clients}
        tableName="Client"
        BodyData={clients}
      />
    </div>
  );
};

export default ClientTable;
