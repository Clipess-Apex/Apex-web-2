import { Link } from 'react-router-dom';
import './MainDashboard.css'
import TimeEntryIcon from '../../icons/shared/dashboard/AttendanceDashboardIcon.svg';
import InventoryIcon from '../../icons/shared/dashboard/InventoryDashboard.svg'
import LeaveIcon from '../../icons/shared/dashboard/LeaveDashboard.svg';
import WorkPlanIcon from '../../icons/shared/dashboard/WorkPlanDashboard.svg';
import DashboardCard from './DashboardCard';

const employeeCardData = [
  { id: 1, title: 'Time-Entry', icon: <img src={TimeEntryIcon} alt="Time Entry" className="dashboard-card-icon" />, path: '/timeEntry/employee' },
  { id: 2, title: 'Inventory', icon: <img src={InventoryIcon} alt="Inventory" className="dashboard-card-icon" />, path: '/inventory/employee/' },
  { id: 3, title: 'Leaves', icon: <img src={LeaveIcon} alt="Leave" className="dashboard-card-icon" />, path: '/leave' },
  { id: 4, title: 'Work-Plan', icon: <img src={WorkPlanIcon} alt="WorkPlan" className="dashboard-card-icon" />, path: '/workplan/employee' },
]

const mainEmployeeDashboard = () => {
  return (
    <div className="dashboard-interface">
      <div className="dashboard-interface-card-container">
        {employeeCardData.map((card) => (
          <Link to={card.path} key={card.id} style={{ textDecoration: 'none' }}>
            <DashboardCard
              key={card.id}
              title={card.title}
              icon={card.icon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default mainEmployeeDashboard