import BackButton from "../../../components/workPlan/Shared/BackButton";
import WorkCalendar from "../../../components/workPlan/WorkCalendar/WorkCalendar";

const EmployeeWorkCalendarView = () => {
  return (
    <>
      <WorkCalendar />
      <BackButton buttonText="Back to Dashboard" />
    </>
  );
};

export default EmployeeWorkCalendarView;
