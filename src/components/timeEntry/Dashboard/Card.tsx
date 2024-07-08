import React from 'react'
import '../../../styles/timeEntry/DashBoard/Card.css'

interface CardProps {
  title: React.ReactNode;
  content: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, icon }) => {

  return (
    <>
      <div className="attendanceCard">
        <div className="card-icon">{icon}</div>
        <h2 className="card-title">{title}</h2>
      </div>
    </>
  );
}

export default Card