import React from "react";
import { useDrag } from "react-dnd";
import '../../../styles/timeEntry/EmployeeAttendanceEntry/TimeEntryTypeButton.css'

interface TimeEntryTypeButtonProps {
  id: number;
  text: string;
  canDrag?: boolean;
  timeEntryTypeId?: number;
  className?: string;
}

const TimeEntryTypeButton: React.FC<TimeEntryTypeButtonProps> = ({ id, text, canDrag = true, timeEntryTypeId, className, }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id, timeEntryTypeId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={canDrag ? drag : null}
      className="typeButton"
      style={{
        border: isDragging ? "5px solid pink" : undefined,
      }}
    >
      {text}
    </div>
  );
};

export default TimeEntryTypeButton;
