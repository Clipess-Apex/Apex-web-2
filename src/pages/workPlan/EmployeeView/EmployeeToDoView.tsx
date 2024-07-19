import EmployeeToDoTable from "../../../components/workPlan/EmployeeTable/EmployeeToDoTable";
import BackButton from "../../../components/workPlan/Shared/BackButton";

const EmployeeToDoView = () => {
  return (
    <>
      <EmployeeToDoTable />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default EmployeeToDoView;
