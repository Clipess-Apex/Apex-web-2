import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import '../../../styles/timeEntry/DashBoard/EmployeeCalendar.css'
import '../../../styles/timeEntry/DashBoard/ChartContainer.css'
import {TimeEntryDashboardCalendar  } from '../common/CalendarStyledComponents'

interface CalendarTileProperties {
  date: Date;
  view: string;
}

interface WorkingDay {
  date: string;
  dateType: string;
}

const EmployeeCalendar = () => {

  const [monthlyWorkingDays, setMonthlyWorkingDays] = useState<WorkingDay[]>([]);

  useEffect(() => {
    fetchMonthlyWorkingDays();
  }, []);

  const fetchMonthlyWorkingDays = async () => {
    try {
      const response = await fetch('https://localhost:7166/api/TimeEntry/GetMonthlyWorkingDays');
      if (response.ok) {
        const data: WorkingDay[] = await response.json();
        setMonthlyWorkingDays(data);
      } else {
        console.error('Failed to fetch monthly working days');
      }
    } catch (error) {
      console.error('Error fetching monthly working days:', error);
    }
  };

  const showEntireDays = ({ date, view }: CalendarTileProperties) => {
    if (view === 'month') {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const isWorkingDay = monthlyWorkingDays.some(
        (day) => day.date.split('T')[0] === formattedDate && day.dateType.toLowerCase() === 'working'
      );
      return isWorkingDay ? (
        <div className="EmployeeCalendar-workingDay"></div>
      ) : null;
    }
    return null;
  };

  const tileDisabled = ({ date, view }: CalendarTileProperties) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tileDate = new Date(date);
    tileDate.setHours(0, 0, 0, 0);
    if (view === 'month') {
      return tileDate < today;
    }
    return false;
  };

  return (

    <>
      <div className="chart-container">
        <TimeEntryDashboardCalendar>
        <Calendar
          tileContent={showEntireDays}
          tileDisabled={tileDisabled}
        />
        </TimeEntryDashboardCalendar>
      </div>
    </>

  )
}

export default EmployeeCalendar