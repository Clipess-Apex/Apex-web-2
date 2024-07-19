import React from 'react'
import './MainDashboard.css'

interface DashboardCardProps {
    title: React.ReactNode;
    icon: React.ReactNode;
  }


const DashboardCard : React.FC<DashboardCardProps> = ({title,icon}) => {
    return (
        <div className="dashboard-card">
        <div className="dashboard-card-icon">{icon}</div>
        <h2 className="dashboard-card-title">{title}</h2>
      </div>
      )
}

export default DashboardCard