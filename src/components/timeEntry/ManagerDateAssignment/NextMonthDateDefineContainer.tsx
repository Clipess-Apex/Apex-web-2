import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import '../../../styles/timeEntry/ManagerDateAssignment/NextMonthDateDefineContainer.css'
import BackButton from '../common/BackButton';
import { ToastContainer, toast, Bounce, Zoom } from 'react-toastify';
import {TimeEntryManagerCalendar  } from '../common/CalendarStyledComponents'

interface CalendarTileProperties {
    date: Date;
    view: string;
}

const NextMonthDateDefineContainer = () => {

    const [receivedWorkingDays, setReceivedWorkingDays] = useState<string[]>([]);
    const [workingDays, setWorkingDays] = useState<string[]>([]);
    const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

    const noOfSelectedDates = workingDays.length;
    const numberOfMinutesperHour = 60
    const workingHoursForDay = 8 
    const workingTimefordayInMinutes = numberOfMinutesperHour * workingHoursForDay;
    const noOfHours = noOfSelectedDates * workingTimefordayInMinutes;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    useEffect(() => {
        fetchMonthlyWorkingDays();
        setActiveStartDate(new Date(nextYear, nextMonth, 1));
    }, []);


    const fetchMonthlyWorkingDays = async () => {
        try {
            const response = await fetch(
                "https://localhost:7166/api/TimeEntry/GetMonthlyWorkingDays"
            );
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched Monthly Working Days:", data);

                const workingDays = data
                    .filter((day: any) => {
                        const date = new Date(day.date);
                        const month = date.getMonth();
                        const year = date.getFullYear();
                        return (
                            day.dateType.toLowerCase() === "working" &&
                            month === nextMonth &&
                            year === nextYear
                        );
                    })
                    .map((day: any) => day.date.split("T")[0]);
                setReceivedWorkingDays(workingDays);
                setWorkingDays(workingDays);
                console.log("Filtered Working Dates for Next Month:", workingDays);
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
                <div className="DateDefine-selectedTile"></div>
            ) : null;
        }
        return null;
    };

    const handleDateClick = (date: Date) => {
        if (date.getMonth() === nextMonth && date.getFullYear() === nextYear) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
                .toString()
                .padStart(2, "0")}`;

            if (workingDays.includes(formattedDate)) {
                setWorkingDays(workingDays.filter((d) => d !== formattedDate));
            } else {
                setWorkingDays([...workingDays, formattedDate].sort());
            }
        }
    };

    const handleCreateOrUpdateMonthlyTimeEntries = async () => {
        const workingMonth = `${nextYear}-${(nextMonth + 1)
            .toString()
            .padStart(2, "0")}`;

        if (receivedWorkingDays.length) {
            try {
                console.log("HandleApi called");
                const response = await fetch(
                    `https://localhost:7166/api/TimeEntry/UpdateMonthlyTimeEntriesByManager?allocatedTime=${noOfHours}&month=${workingMonth}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("HandleApi exit ");
                if (response.ok) {
                    const jsonData = await response.json();
                    console.log("API response:", jsonData);
                    console.log("Data sent successfully");
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
        } else {
            try {
                console.log("HandleApi called");
                const response = await fetch(
                    `https://localhost:7166/api/TimeEntry/CreateMonthlyTimeEntriesByManager?allocatedTime=${noOfHours}&workingMonth=${workingMonth}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("HandleApi exit ");
                if (response.ok) {
                    const jsonData = await response.json();
                    console.log("API response:", jsonData);
                    toast.success("Records Created  Successfully")
                    createMonthlyWorkingDays();
                } else {
                    console.log("Failed to send data");
                    toast.error("Action Failed while Creating Records")
                }
            } catch (error) {
                console.error("Error calling API:", error);
                toast.error(`Error Occoured while Creating Records- ${error}`)
            }
        }
    };

    const UpdateMonthlyWorkingDays = async () => {
        try {
            console.log("UpdateMonthlyWorkingDays called");
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
            console.log("UpdateMonthlyWorkingDays exit");

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

    const createMonthlyWorkingDays = async () => {
        try {
            console.log("createMonthlyWorkingDays called");
            const response = await fetch(
                "https://localhost:7166/api/TimeEntry/CreateMonthlyWorkingDaysByManager",
                {
                    method: "POST",
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
                toast.success("Calendar Dates Created Successfully")
                fetchMonthlyWorkingDays();
            } else {
                console.log("Failed to send data");
                toast.error("Action Failed while Creating Calendar Days")
            }
        } catch (error) {
            console.error("Error calling API:", error);
            toast.error(`Error Occoured while Creating Calendar Days- ${error}`)
        }
    };

    const handleDeleteTimeEntries = async () => {
        const workingMonth = `${nextYear}-${(nextMonth + 1)
            .toString()
            .padStart(2, "0")}`;
        try {
            console.log("Next Month is:", workingMonth);
            console.log("Inside Monthly time entries function");
            const response = await fetch(
                `https://localhost:7166/api/TimeEntry/DeleteMonthlyTimeEntriesByManager?month=${workingMonth}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("Monthly Records deleted successfully:", result);
                toast.success("Records Deleted Successfully")
                handleDeleteMonthlyWorkingDays();
            } else {
                console.error("Failed to delete records:", response.statusText);
                toast.error("Action Failed while Deleting Records")
            }
        } catch (error) {
            console.error("Error occurred while deleting records:", error);
            toast.error(`Error Occoured while Deleting records - ${error}`)
        }
    };

    const handleDeleteMonthlyWorkingDays = async () => {
        const workingMonth = `${nextYear}-${(nextMonth + 1)
            .toString()
            .padStart(2, "0")}`;
        try {
            const response = await fetch(
                `https://localhost:7166/api/TimeEntry/DeleteMonthlyWorkingDaysByManager?month=${workingMonth}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                toast.success("Calendar Days Deleted Successfully")
                fetchMonthlyWorkingDays();
            } else {
                console.error("Failed to delete records:", response.statusText);
                toast.error("Action Failed while Deleting Calendar Days")
            }
        } catch (error) {
            console.error("Error occurred while deleting records:", error);
            toast.error(`Error Occoured while Deleting calendar Days - ${error}`)
        }
    };

    const convertMinutesToHours = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        return `${hours} Hours`;
      };

    return (
        <>
            <div className="dateDefine-mainContainer">
                <div className="dateDefine-leftSubContainer">
                    <TimeEntryManagerCalendar>
                    <Calendar tileContent={tileContent} onClickDay={handleDateClick} />
                    </TimeEntryManagerCalendar>

                    <button onClick={handleCreateOrUpdateMonthlyTimeEntries} className="nextMonth-button">
                        {receivedWorkingDays.length ? "Update Records" : "Create Records"}
                    </button>
                </div>
                <div className="dateDefine-rightSubContainer">
                    <div className="textDiv">
                        <div className="text-Container">
                            <p>No of Days Selected: {noOfSelectedDates}</p>
                            <p>No of Working Hours: {convertMinutesToHours(noOfHours)}</p>
                        </div>
                    </div>
                    <button className="delete-button" onClick={handleDeleteTimeEntries}>
                        Delete Records
                    </button>
                </div>
            </div>


            <div className="dateDefine-backButtonContainer">
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

export default NextMonthDateDefineContainer
