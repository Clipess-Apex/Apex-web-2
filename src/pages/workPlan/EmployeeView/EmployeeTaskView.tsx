import EmployeeTaskTable from "../../../components/workPlan/EmployeeTable/EmployeeTaskTable";
import BackButton from "../../../components/workPlan/Shared/BackButton";

const EmployeeTaskView = () => {
  return (
    <>
      <EmployeeTaskTable />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default EmployeeTaskView;
