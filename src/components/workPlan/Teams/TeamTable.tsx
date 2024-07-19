import { useState, useEffect } from "react";
import { Team } from "../../../models/workPlan/Team";
import { getTeams } from "../../../services/workPlan/TeamServices";
import Table from "../Shared/Table";

const columns = [
  { key: "teamId", header: "Team ID", width: 150 },
  { key: "teamName", header: "Team Name", width: 200 },
  { key: "description", header: "Description", width: 200 },
  { key: "createdDate", header: "Created Date", width: 130 },
  { key: "updatedDate", header: "Updated Date", width: 130 },
  { key: "edit", header: " " },
  { key: "delete", header: " " },
];

const TeamTable = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTeams();

        data.forEach((element: any) => {
          element["delete"] = "true";
          element["edit"]="true";
        });
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchData();

    return () => {
      setTeams([]);
    };
  }, []);

  return (
    <div>
      <Table columns={columns} data={teams} tableName="Team" BodyData={teams} />
    </div>
  );
};

export default TeamTable;
