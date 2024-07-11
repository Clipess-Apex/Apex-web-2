import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DepartmentEmployeeCountDto {
  departmentEmployeeCountTotal: number;
  departmentCounts: { [key: string]: number };
}

const AdminDashboardBarChart = () => {
  const [departmentCounts, setDepartmentCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchEmployeeCountByDepartment();
  }, []);

  const fetchEmployeeCountByDepartment = async () => {
    try {
      const response = await fetch('https://localhost:7166/api/employee/employee-count-by-department');
      if (!response.ok) {
        throw new Error('Failed to fetch employee counts by department');
      }
      const data: DepartmentEmployeeCountDto = await response.json();
      setDepartmentCounts(data.departmentCounts);
    } catch (error) {
      console.error('Error fetching employee counts by department:', error);
    }
  };

  const data = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: 'Employee Count',
        data: Object.values(departmentCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
    //   title: {
    //     display: true,
    //     text: 'Employee Count by Department',
    //   },
    // },
  };

  return (
    <div style={{ width: '600px'}}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AdminDashboardBarChart;
