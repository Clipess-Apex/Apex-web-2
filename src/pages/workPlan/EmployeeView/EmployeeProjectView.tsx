import EmployeeProjectTable from "../../../components/workPlan/EmployeeTable/EmployeeProjectTable";
import BackButton from "../../../components/workPlan/Shared/BackButton";

const EmployeeProjectView = () => {
  return (
    <>
      <EmployeeProjectTable />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default EmployeeProjectView;
