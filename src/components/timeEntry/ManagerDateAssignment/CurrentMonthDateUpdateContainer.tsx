import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import '../../../styles/timeEntry/ManagerDateAssignment/CurrentMonthDateUpdateContainer.css'
import BackButton from '../common/BackButton';
import { ToastContainer, toast, Bounce, Zoom } from 'react-toastify';
import {TimeEntryManagerCalendar  } from '../common/CalendarStyledComponents'

interface CalendarTileProperties {
  date: Date;
  view: string;
}

interface WorkingDay {
  date: string;
  dateType: string;
}

const CurrentMonthDateUpdateContainer = () => {

  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const noOfSelectedDates = workingDays.length;
  const numberOfMinutesperHour = 60
  const workingHoursForDay = 8 
  const workingTimefordayInMinutes = numberOfMinutesperHour * workingHoursForDay;
  const noOfHours = noOfSelectedDates * workingTimefordayInMinutes;

  useEffect(() => {
    fetchMonthlyWorkingDays();
  }, []);

  const fetchMonthlyWorkingDays = async () => {
    try {
      const response = await fetch(
        "https://localhost:7166/api/TimeEntry/GetMonthlyWorkingDays"
      );
      if (response.ok) {
        const data: WorkingDay[] = await response.json();

        console.log("Fetched Monthly Working Days:", data);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const workingDays = data
          .filter((day) => {
            const date = new Date(day.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return (
              day.dateType.toLowerCase() === "working" &&
              month === currentMonth &&
              year === currentYear
            );
          })
          .map((day) => day.date.split("T")[0]);
        setWorkingDays(workingDays);
      } else {
        console.error("Failed to fetch monthly working days");
      }
    } catch (error) {
      console.error("Error fetching monthly working days:", error);
    }
  };

  const tileContent = ({ date, view }: CalendarTileProperties) => {
    if (view === 'month') {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      return workingDays.includes(formattedDate) ? (
        <div className="DateUpdate-selectedTile"></div>
      ) : null;
    }
    return null;
  };

  const handleDateClick = (date: Date) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    console.log("Current Month is", currentMonth, "--- current year is", currentYear, "-- current Date", currentDate);
    console.log("date.getMonth() is ", date.getMonth(), "date.getFullYear() is", date.getFullYear());

    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      if (workingDays.includes(formattedDate)) {
        setWorkingDays(workingDays.filter((d) => d !== formattedDate));
      } else {
        setWorkingDays([...workingDays, formattedDate].sort());
      }
    }
  };

  const tileDisabled = ({ date, view }: CalendarTileProperties) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    const tileDate = new Date(date);
    tileDate.setHours(0, 0, 0, 0); // Set time to the start of the day

    if (view === 'month') {
      return tileDate <= today;
    }
    return false;
  };

  const updatemonthlyWorkingEntries = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const workingMonth = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}`;

    try {
      console.log("updatemonthlyWorkingEntries called");
      const response = await fetch(
        `https://localhost:7166/api/TimeEntry/UpdateMonthlyTimeEntriesByManager?allocatedTime=${noOfHours}&month=${workingMonth}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("updatemonthlyWorkingEntries exit ");
      if (response.ok) {
        const jsonData = await response.json();
        console.log("API response:", jsonData);
        toast.success("Records Updated  Successfully")
        UpdateMonthlyWorkingDays();

      } else {
        console.log("Failed to send data");
        toast.error("Action Failed while updating Records")
      }
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error(`Error Occoured  while Updating Records - ${error}`)
    }
  };

  const UpdateMonthlyWorkingDays = async () => {
    console.log("Selected Dates:", workingDays);

    try {
      console.log("createMonthlyWorkingDays called");
      const response = await fetch(
        "https://localhost:7166/api/TimeEntry/UpdateMonthlyWorkingDaysByManager",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workingDays),
        }
      );
      console.log("createMonthlyWorkingDays exit");

      if (response.ok) {
        const jsonData = await response.json();
        console.log("API response:", jsonData);
        toast.success("Calendar Updated  Successfully")
        fetchMonthlyWorkingDays();
      } else {
        console.log("Failed to send data");
        toast.error("Action Failed while Updating Calendar Days")
      }
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error(`Error Occoured while Updating Days- ${error}`)
    }
  };

  const convertMinutesToHours = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    return `${hours} Hours`;
  };

  return (

    <>
      <div className="DateUpdate-mainContainer">

        <div className="DateUpdate-leftSubContainer">
          <TimeEntryManagerCalendar>
          <Calendar tileContent={tileContent} onClickDay={handleDateClick} tileDisabled={tileDisabled} />
          </TimeEntryManagerCalendar>
          <button onClick={updatemonthlyWorkingEntries} className="currentMonth-button">
            Update
          </button>
        </div>

        <div className="DateUpdate-rightSubContainer">
          <div className="textDiv">
            <div className="text-Container">
              <p>No of Days Selected: {noOfSelectedDates}</p>
              <p>No of Working Hours: {convertMinutesToHours(noOfHours)}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="DateUpdate-backButtonContainer">
        <BackButton path={"/timeEntry/manager"} />
      </div>

      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce} />
    </>

  )
}

export default CurrentMonthDateUpdateContainer