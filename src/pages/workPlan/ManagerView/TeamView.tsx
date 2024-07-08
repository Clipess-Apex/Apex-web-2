import { useState } from "react";
import TeamTable from "../../../components/workPlan/Teams/TeamTable";
import AddButton from "../../../components/workPlan/Shared/AddButton";
import TeamModal from "../../../components/workPlan/Teams/TeamModal";
import BackButton from "../../../components/workPlan/Shared/BackButton";

const TeamView = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AddButton buttonText="+ ADD TEAM" onClick={handleOpenDialog} />
      <TeamTable />
      <TeamModal open={openDialog} onClose={handleCloseDialog} />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default TeamView;
