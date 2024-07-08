import { useState } from "react";
import ProjectTable from "../../../components/workPlan/Projects/ProjectTable";
import AddButton from "../../../components/workPlan/Shared/AddButton";
import ProjectModal from "../../../components/workPlan/Projects/ProjectModal";
import BackButton from "../../../components/workPlan/Shared/BackButton";

const ProjectView = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AddButton buttonText="+ ADD PROJECT" onClick={handleOpenDialog} />
      <ProjectTable />
      <ProjectModal open={openDialog} onClose={handleCloseDialog} />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default ProjectView;
