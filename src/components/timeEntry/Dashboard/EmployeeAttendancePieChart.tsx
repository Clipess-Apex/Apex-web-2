import React, { useState, useEffect,useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import '../../../styles/timeEntry/DashBoard/ChartContainer.css'
import { format } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlyTimeEntry {
  completedDuration: number;
  allocatedDuration: number;
};

interface StoredUser {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

const EmployeeAttendancePieChart = () => {

  const Employee = useRef<StoredUser | null>(null); // Ref for storing user data

  const [employeeId, setEmployeeId] = useState<number>();
  const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [monthlyTimeEntry, setMonthlyTimeEntry] = useState<MonthlyTimeEntry | undefined>(undefined);
  const [completedTime, setCompletedTime] = useState<{ numeric: number; formatted: string }>({ numeric: 0, formatted: '' });
  const [remainingTime, setRemainingTime] = useState<{ numeric: number; formatted: string }>({ numeric: 0, formatted: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); // Parse storedUser as StoredUser type
      Employee.current = parsedUser
      
      setEmployeeId(Employee.current.EmployeeID)
    }
  },[])


  useEffect(() => {
      fetchMonthlyTimeEntry();
  },[employeeId])



  useEffect(() => {
    if (monthlyTimeEntry) {
      calculateData();
    }
  }, [monthlyTimeEntry]);

  const fetchMonthlyTimeEntry = async () => {
    try {
      console.log("Pie chart Employee Id is ", employeeId)
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetMonthlyTimeEntryForPieChart?employeeId=${employeeId}&currentDate=${currentDate}`);
      if (response.ok) {
        const jsonData = await response.json();
        setMonthlyTimeEntry(jsonData[0]);
      } else {
        console.log("Failed to fetch value");
      }
    } catch (error) {
      console.error("Error fetching Value", error);
    }
  };

  const convertMinutesToHours = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { numeric: totalMinutes, formatted: `${hours} hour(s) and ${minutes} minute(s)` };
  };

  const calculateData = () => {
    if (monthlyTimeEntry) {
      const completedDuration = monthlyTimeEntry.completedDuration;
      const allocatedDuration = monthlyTimeEntry.allocatedDuration;
      if (completedDuration < allocatedDuration) {
        setCompletedTime(convertMinutesToHours(completedDuration));
        setRemainingTime(convertMinutesToHours(allocatedDuration - completedDuration));
      } else if (completedDuration >= allocatedDuration) {
        setCompletedTime(convertMinutesToHours(completedDuration));
        setRemainingTime(convertMinutesToHours(0));
      } else if (completedDuration === null) {
        setCompletedTime(convertMinutesToHours(0));
        setRemainingTime(convertMinutesToHours(allocatedDuration));
      }
    }
  };

  const data = {
    labels: ['Completed Time', 'Remaining Time'],
    datasets: [
      {
        label: 'No of Hours',
        data: [completedTime.numeric, remainingTime.numeric],
        backgroundColor: [
          'rgba(0, 167, 167, 0.8)',
          'rgba(0, 167, 167, 0.2)',
        ],
        borderColor: [
          'rgba(0, 167, 167, 1)',
          'rgba(0, 167, 167, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
      display: true,
      text: 'Working Hour Percentage',
      font: {
        size: 22
      },
      padding: {
        top: 0,
        bottom: 10
    },
    color: '#00A7A7',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const dataIndex = tooltipItem.dataIndex;
            const label = data.labels[dataIndex];
            let formattedTime;
            if (label === 'Completed Time') {
              formattedTime = completedTime.formatted;
            } else if (label === 'Remaining Time') {
              formattedTime = remainingTime.formatted;
            }
            return `  ${formattedTime}`;
          }
        }
      }
    },
  };

  return (
    <>
      <div className="chart-container">
        <div style={{ position: 'relative', height: '300px', width: '300px' }}>
          <Pie data={data} options={options} />
        </div>
      </div>
    </>



  )
}

export default EmployeeAttendancePieChart