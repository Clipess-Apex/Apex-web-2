// ManagerInterface.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import LeaveRequestIcon from '../../icons/leaves/CreateLeaveIcon.svg';
import LeaveHistoryIcon from '../../icons/leaves/EmployeeLeaveHistoryIcon.svg';
import PendingLeaveIcon from '../../icons/leaves/PendingLeaveIcon.svg';
import RemainingLeavesIcon from '../../icons/leaves/RemaingLeavesIcon.svg';
import './LeaveEmployeePage.css';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const LeaveManagerCard: React.FC<CardProps> = ({ title, icon, path }) => {
  return (
    <div className="leave-emplyee-card">
      <div className="leave-employee-card-icon">{icon}</div>
      <h2 className="leave-employee-card-title">{title}</h2>
    </div>
  );
};

const managerCardData = [
  { id: 1, title: 'Create Leave', icon: <img src={LeaveRequestIcon} alt="Create Leave" className="leave-employee-card-icon" />, path: '/leave/employee/leave-request' },
  { id: 2, title: 'Leave History', icon: <img src={LeaveHistoryIcon} alt="Leave History" className="leave-employee-card-icon" />, path: '/leave/employee/leave-history' },
  { id: 3, title: 'Remaining Leaves', icon: <img src={RemainingLeavesIcon} alt="Remaining Leaves" className="leave-employee-card-icon" />, path: '/leave/employee/remaining-leaves' },
  { id: 4, title: 'Pending Leaved', icon: <img src={PendingLeaveIcon} alt="Pending Leaves" className="leave-employee-card-icon" />, path: '/leave/employee/pending-leaves' },
];

const EmployeeInterface: React.FC = () => {
  return (
    <div className="leave-employee-interface">
      <div className="leave-employee-interface-card-container">
        {managerCardData.map((card) => (
          <Link to={card.path} key={card.id} style={{ textDecoration: 'none' }}>
            <LeaveManagerCard
              key={card.id}
              title={card.title}
              icon={card.icon}
              path={card.path}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeInterface;
