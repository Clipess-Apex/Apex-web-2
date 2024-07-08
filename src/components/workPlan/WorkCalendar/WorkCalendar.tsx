import { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { ProjectTask } from "../../../models/workPlan/ProjectTask";
import { getTasks } from "../../../services/workPlan/TaskServices";
import "react-calendar/dist/Calendar.css";
import "../../../styles/workPlan/WorkCalendar.css";

const WorkCalendar = () => {
  const [dateInfo, setDateInfo] = useState<{ [key: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  let EmployeeData: ProjectTask[] = [];
  let items: ProjectTask[] = [];
  let employeeId: number = 1;

  const formatDate = (datetime: Date): string => {
    if (datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString("en-CA");
    }
    return "N/A";
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTasks();

        const dateInfoMap: { [key: string]: string } = {};
        data.forEach((element: any) => {
          if (element["assigned"] == true) {
            items.push(element);
          }
        });

        items.forEach((element: any) => {
          const userArray = element["selectedUsers"]
            .split(",")
            .map((user: any) => user.trim());

          for (let index = 0; index < userArray.length; index++) {
            if (userArray[index] == employeeId) {
              if (EmployeeData.includes(element)) {
              } else {
                EmployeeData.push(element);
              }
            }
          }
        });

        EmployeeData.forEach((userData: any) => {
          const formattedDate = formatDate(userData.endDate);
          dateInfoMap[formattedDate] = userData.taskName || "No description";
        });
        setDateInfo(dateInfoMap);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchData();
  }, [dateInfo]);

  const onChange: CalendarProps["onChange"] = (value, event) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value) && value.length > 0) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <div>
      <div className="workplan">
        <Calendar
          tileClassName="custom-tile"
          onChange={onChange}
          value={selectedDate}
          tileContent={({ date, view }) =>
            view === "month" && dateInfo[formatDate(date)] ? (
              <div className="tile-content">
                <p>{dateInfo[formatDate(date)]}</p>
              </div>
            ) : null
          }
        />
      </div>
    </div>
  );
};

export default WorkCalendar;
