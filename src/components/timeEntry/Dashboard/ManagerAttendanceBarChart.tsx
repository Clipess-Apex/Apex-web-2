import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors } from 'chart.js';
import '../../../styles/timeEntry/DashBoard/ChartContainer.css'
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyTimeEntry {
  firstName?: string;
  lastName?: string;
  employeeId: number;
  completedDuration?: number;
}

const ManagerAttendanceBarChart = () => {

  const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [monthlyTimeEntries, setMonthlyTimeEntries] = useState<MonthlyTimeEntry[]>([]);
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);
  const [duration, setDuration] = useState<number[]>([]);

  useEffect(() => {
    fetchMonthlyTimeEntry();
  }, []);

  useEffect(() => {
    if (monthlyTimeEntries.length > 0) {
      calculateData();
    }
  }, [monthlyTimeEntries]);

  const fetchMonthlyTimeEntry = async () => {
    try {
      console.log("date is", currentDate);
      const response = await fetch(`https://localhost:7166/api/TimeEntry/GetMonthlyTimeEntryForBarChart?currentDate=${currentDate}`);
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Monthly Time Entry in json data", jsonData);
        setMonthlyTimeEntries(jsonData);
      } else {
        console.log("Failed to fetch value");
      }
    } catch (error) {
      console.error("Error fetching Value", error);
    }
  };

  const calculateData = () => {
    const names: string[] = [];
    const durations: number[] = [];

    monthlyTimeEntries.forEach((item) => {
      const fullName = item.firstName ? `${item.firstName} ${item.lastName}` : `Employee ${item.employeeId}`;
      names.push(fullName);
      durations.push(item.completedDuration ? item.completedDuration : 0);
    });

    setEmployeeNames(names);
    setDuration(durations);
  };

  const convertMinutesToHoursScale = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const convertMinutesToHoursTooltip = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hour(s) and ${minutes} minute(s)`;
  };

  const data = {
    labels: employeeNames,
    datasets: [
      {
        label: 'Completed Duration',
        data: duration,
        backgroundColor: [
          'rgba(0, 167, 167, 0.8)',
        ],
        borderColor: [
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
        text: 'Company Working Chart',
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
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw as number;
            return ' ' + convertMinutesToHoursTooltip(value);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return convertMinutesToHoursScale(value);
          },
        },
      },
    },
  };
  return (
    <>
      <div className="attendance-barChart-container">
        <div className='barChart'>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  )
}

export default ManagerAttendanceBarChart