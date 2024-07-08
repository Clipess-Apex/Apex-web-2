import React from "react";
import "../../../styles/workPlan/WorkPlanCard.css";

interface CardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const WorkPlanCard: React.FC<CardProps> = ({ title, content, icon }) => {
  return (
    <>
      <div className="WorkPlanCard">
        <div className="card-icon">{icon}</div>
        <h2 className="card-title">{title}</h2>
      </div>
    </>
  );
};

export default WorkPlanCard;
