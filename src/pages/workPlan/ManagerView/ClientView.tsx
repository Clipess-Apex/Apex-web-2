import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ClientTable from "../../../components/workPlan/Clients/ClientTable";
import AddButton from "../../../components/workPlan/Shared/AddButton";
import ClientModal from "../../../components/workPlan/Clients/ClientModal";
import BackButton from "../../../components/workPlan/Shared/BackButton";

const ClientView = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AddButton buttonText="+ ADD CLIENT" onClick={handleOpenDialog} />
      <ClientTable />
      <ClientModal open={openDialog} onClose={handleCloseDialog} />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default ClientView;
