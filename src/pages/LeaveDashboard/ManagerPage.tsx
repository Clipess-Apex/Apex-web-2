// ManagerInterface.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import LeaveRequestIcon from '../../icons/leaves/CreateLeaveIcon.svg';
import LeaveHistoryIcon from '../../icons/leaves/EmployeeLeaveHistoryIcon.svg';
import ManageLeaveIcon from '../../icons/leaves/ManageLeavesIcon.svg';
import CompanyLeaveHistoryIcon from '../../icons/leaves/CompanyLeaveHistoryIcon.svg';
import LeaveSettingsIcon from '../../icons/leaves/LeaveSettingsLcon.svg';
import RemainingLeavesIcon from '../../icons/leaves/RemaingLeavesIcon.svg';
import ReportGenerationIcon from '../../icons/leaves/ReportGenerationIcon.svg';
import './ManagerPage.css';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const LeaveManagerCard: React.FC<CardProps> = ({ title, icon, path }) => {
  return (
    <div className="leave-manager-card">
      <div className="leave-manager-card-icon">{icon}</div>
      <h2 className="leave-manager-card-title">{title}</h2>
    </div>
  );
};

const managerCardData = [
  { id: 1, title: 'Manage Leave', icon: <img src={ManageLeaveIcon} alt="Manage Leave" className="leave-manager-card-icon" />, path: '/manage-leave' },
  { id: 2, title: 'Company Leave History', icon: <img src={CompanyLeaveHistoryIcon} alt="Company Leave History" className="leave-manager-card-icon" />, path: '/company-leave-history' },
  { id: 3, title: 'Leave Settings', icon: <img src={LeaveSettingsIcon} alt="Leave Settings" className="leave-manager-card-icon" />, path: '/leave-settings' },
  { id: 4, title: 'Generate Leave Reports', icon: <img src={ReportGenerationIcon} alt="Report Generation" className="leave-manager-card-icon" />, path: '/report-generation' },
  { id: 5, title: 'Create Leave', icon: <img src={LeaveRequestIcon} alt="Create Leave" className="leave-manager-card-icon" />, path: '/leave-request' },
  { id: 6, title: 'Leave History', icon: <img src={LeaveHistoryIcon} alt="Leave History" className="leave-manager-card-icon" />, path: '/leave-history' },
  { id: 7, title: 'Remaining Leaves', icon: <img src={RemainingLeavesIcon} alt="Remaining Leaves" className="leave-manager-card-icon" />, path: '/remaining-leaves' },
];

const ManagerInterface: React.FC = () => {
  return (
    <div className="leave-manager-interface">
      <div className="leave-manager-interface-card-container">
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

export default ManagerInterface;
