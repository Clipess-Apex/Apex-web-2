import React, { useEffect, useState } from 'react';
import { fetchLeaveTypes } from '../../../services/LeaveTypeServices';
import { fetchCurrentLeaveCount } from '../../../services/LeaveServices';
import LeaveChartComponents from '../../../components/leaveComponents/Charts/LeaveChartComponent'
import './RemainingLeaves.css';
import { LeaveType } from '../../../models/LeaveTypes';

interface LeaveData {
    leaveTypeId: number;
    leaveTypeName: string;
    maxLeaveCount: number;
    currentLeaveCount: number;
    remainingLeaveBalance: number;
    usedLeaveBalance: number;
}

interface Props {
    employeeId: number;
}

const LeaveTypeChart: React.FC<Props> = ({ employeeId }) => {
    const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const getData = async () => {
            try {
                const leaveTypes: LeaveType[] = await fetchLeaveTypes();
                console.log('Fetched leave types:', leaveTypes);
    
                const leaveCounts = await Promise.all(
                    leaveTypes.map(async (type) => {
                        const count = await fetchCurrentLeaveCount(employeeId, type.leaveTypeId);
                        console.log(`Fetched leave count for leaveTypeId ${type.leaveTypeId}:`, count);
                        return count;
                    })
                );
                console.log('Fetched leave counts:', leaveCounts);
    
                const data: LeaveData[] = leaveTypes.map((type, index) => {
                    const currentLeaveCount = leaveCounts[index] ?? 0;
                    // Additional logging to verify the indices and values
                    console.log(`Index: ${index}, Leave Type: ${type.leaveTypeName}, Leave Count: ${currentLeaveCount}`);
                    const maxLeaveCount = type.maxLeaveCount ?? 0;
                    const remainingLeaveBalance = maxLeaveCount - currentLeaveCount;
                    return {
                        leaveTypeId: type.leaveTypeId,
                        leaveTypeName: type.leaveTypeName,
                        maxLeaveCount,
                        currentLeaveCount,
                        remainingLeaveBalance,
                        usedLeaveBalance: currentLeaveCount,
                    };
                });
                
    
                setLeaveData(data);
            } catch (error) {
                console.error('Error fetching data for chart:', error);
                setError('Failed to load leave data. Please try again later.');
            }
        };
    
        getData();
    }, [employeeId]);
    

    return (
        <div className="leave-type-chart-container">
            <div className='Remaining-leaves-header'>
                <h1>Remaining Leaves</h1>
            </div>
            {error && <p className="remaining-leave-error-message">{error}</p>}
            <div className="leave-type-chart-grid">
                {leaveData.map((data, index) => (
                    <LeaveChartComponents key={index} data={data} title={data.leaveTypeName} />
                ))}
            </div>
        </div>
    );
};

export default LeaveTypeChart;
