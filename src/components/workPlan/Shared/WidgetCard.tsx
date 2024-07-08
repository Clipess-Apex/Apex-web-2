import React from "react";
import "../../../styles/workPlan/WidgetCard.css";

interface WidgetCardProps {
  title: string;
  value: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, value }) => {
  return (
    <div className="workplanWidgetCard">
      <div className={"custom-card"}>
        <div className="custom-card-body">
          <div className="custom-card-content">
            <h5 className="custom-card-title">
              {title} : {value}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetCard;
