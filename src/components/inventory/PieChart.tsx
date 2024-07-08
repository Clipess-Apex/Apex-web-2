import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);

interface AssignData {
    assignedCount: number;
    unassignedCount: number;
}

const PieChart = () => { // Corrected function name to start with uppercase

    const [dataForChart, setDataForChart] = useState<AssignData>({ assignedCount: 0, unassignedCount: 0 });

    useEffect(() => {
        fetchInventoryDetails();
    }, []);

    const fetchInventoryDetails = async () => {
        try {
          const url = "https://localhost:7166/api/inventory/AssigningData";
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch inventory details');
          }
          const data = await response.json();
          setDataForChart(data);
        } catch (error) {
          console.error('Error fetching inventory details:', error);
        }
    };

    const EmployeeAssignedCount = dataForChart.assignedCount;
    const NotAssignCount =  dataForChart.unassignedCount;

    const data = {
        labels: ['Assign', 'UnAssign'],
        datasets: [{
            data: [EmployeeAssignedCount, NotAssignCount],
            backgroundColor: ['#008B8B', 'rgba(75, 192, 192, 1)']
        }]
    };

    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8, // Change this to your desired aspect ratio
    };

    return (
        <div>
            <div style={{ width: '250px', height: '250px'}}>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
