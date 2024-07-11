import React,{useState, useEffect} from 'react'
import '../../styles/shared/TimeEntryNotifications.css'

interface TimeEntryNotificationsProps{
  id:number,
  message:string,
  date:string
  fetchNotifications:() => void,
}

const TimeEntryNotifications:React.FC<TimeEntryNotificationsProps> = ({id,message,date,fetchNotifications}) => {
    
      const handleHideNotification = async (id:number) => {
        try {
          const response = await fetch(
            `https://localhost:7166/api/attendanceNotification/HideTimeEntryNotification?notificationId=${id}`,
            {
              method: 'DELETE'
            }
          );
          if (response.ok) {
            console.log("Notification hidden successfully");
            
          } else {
            console.error("Failed to hide notification:", response.statusText);
          }
        } catch (error) {
          console.error("Error hiding notification:", error);
        }
        fetchNotifications();
      }

  return (
    <>
        <div className='timentry-notifications'>
          <p className='timeEntry-message'>{message}</p>
          <div className="timeEntryNotificationContainer">
          <p className='timeEntry-date'> Generated at {date}</p>
          <button className='timEntry-HideButton' onClick={() => handleHideNotification(id)}>Hide</button>
          </div>
        </div>
  </>

  )
}

export default TimeEntryNotifications