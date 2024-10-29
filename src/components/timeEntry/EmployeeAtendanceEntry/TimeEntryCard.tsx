import React from 'react'
import { useDrag } from 'react-dnd'
import '../../../styles/timeEntry/EmployeeAttendanceEntry/TimeEntryCard.css'
import DeleteIcon from '../../../icons/timeEntry/DeleteIcon.svg'
import EditIcon from '../../../icons/timeEntry/EditIcon.svg'

interface TimeEntryCardProps {
  id: number;
  text: string | undefined;
  canDrag?: boolean;
  timeEntryTypeId?: number;
  className?: string;
  onTaskDeleteClick?: () => void;
  onTaskUpdateClick?: () => void;
  onEventDeleteClick?: () => void;
  createdTime?: string;
  duration?: string
}

const TimeEntryCard: React.FC<TimeEntryCardProps> = ({ id, text, canDrag = true, timeEntryTypeId,
  onTaskDeleteClick, onTaskUpdateClick, onEventDeleteClick, createdTime, className, duration }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'div',
    item: { id, timeEntryTypeId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const convertMinutesToHours = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) {
      return `${hours} hours and ${minutes} minutes`;
    }
    else {
      return `${minutes} minutes`;
    }
  };

  return (
    <>
      <div
        ref={canDrag ? drag : null}
        className={`${className} timeEntryCard`}
        style={{
          border: isDragging ? '5px solid pink' : undefined,
        }}
      >
        {<span className='created-time'>  <p> {createdTime} </p></span>}
        {<span className='card-text'><p>{text}
          {duration &&
            <span className="duration">{convertMinutesToHours(parseInt(duration))} </span>}</p></span>}

        <div className="Update-delete-buttonContainer">
          <span>
            {onTaskUpdateClick ? <div className="taskButtons" onClick={onTaskUpdateClick}> <img src={EditIcon} ></img> </div> : undefined}
            {onTaskDeleteClick ? <div className="taskButtons" onClick={onTaskDeleteClick}><img src={DeleteIcon} ></img></div> : undefined}
            {onEventDeleteClick ? <div className="eventButtons" onClick={onEventDeleteClick}><img src={DeleteIcon} ></img> </div> : undefined}
          </span>
        </div>
      </div>
    </>
  )
}

export default TimeEntryCard