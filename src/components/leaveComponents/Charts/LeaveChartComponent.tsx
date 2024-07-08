import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './LeaveChartComponent.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    data: {
        usedLeaveBalance: number;
        remainingLeaveBalance: number;
    };
    title: string;
}

const LeaveChartComponents: React.FC<Props> = ({ data, title }) => {
    const { usedLeaveBalance, remainingLeaveBalance } = data;

    return (
        <div className="leave-chart-card">
            <h3>{title}</h3>
            <div className="leave-chart-container">
                <Doughnut
                    data={{
                        labels: ['Used Leave Balance', 'Remaining Leave Balance'],
                        datasets: [
                            {
                                label: 'Leave Count',
                                data: [usedLeaveBalance, remainingLeaveBalance],
                                backgroundColor: ['#FF6384', '#00A7A8'],
                                hoverBackgroundColor: ['#FF6384', '#00A7A8'],
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.label || '';
                                        const value = context.raw || 0;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = ((Number(value) / total) * 100).toFixed(2) + '%';
                                        return `${label}: ${value} (${percentage})`;
                                    },
                                },
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                        cutout: '70%',
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                    width={160}
                    height={160}
                />
            </div>
            <div className="leave-chart-details">
                <p>Monthly Remaining Leave Balance: {remainingLeaveBalance}</p>
            </div>
        </div>
    );
};

export default LeaveChartComponents;
