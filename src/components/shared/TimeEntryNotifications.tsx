import React,{useState, useEffect} from 'react'
//import '../../styles/shared/TimeEntryNotifications.css'

interface TimeEntryNotificationsProps{
  id:number,
  message:string,
  date:string
}



const TimeEntryNotifications:React.FC<TimeEntryNotificationsProps> = ({id,message,date}) => {
    
      const handleHideNotification = (Id:number) => {
        console.log("Clicked Notification is" ,Id)
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