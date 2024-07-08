import React, { useEffect, useState } from 'react';
import { fetchLeaveTypes } from '../../../services/LeaveTypeServices';
import { fetchCurrentLeaveCount } from '../../../services/LeaveServices';
import LeaveChartComponents from '../Charts/LeaveChartComponent';
import '../../../pages/leavePages/RemainingLeaves/RemainingLeaves.css';
import { useAuth } from '../../../providers/AuthContextProvider';
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
    selectedLeaveTypeId?: number | null;
    employeeId: number;
}

const LeaveChart: React.FC<Props> = ({ selectedLeaveTypeId, employeeId }) => {
    const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
    // const { employeeId } = useAuth();

    useEffect(() => {
        const getData = async () => {
            try {
                const leaveTypes: LeaveType[] = await fetchLeaveTypes(); 
                const leaveCounts = await Promise.all(
                    leaveTypes.map((type) => fetchCurrentLeaveCount(employeeId, type.leaveTypeId))
                );

                const data = leaveTypes.map((type, index) => {
                    const currentLeaveCount = leaveCounts[index] ?? 0;
                    const maxLeaveCount = type.maxLeaveCount ?? 0;
                    const remainingLeaveBalance = maxLeaveCount - currentLeaveCount;
                    return {
                        leaveTypeId: type.leaveTypeId,
                        leaveTypeName: type.leaveTypeName,
                        maxLeaveCount: maxLeaveCount,
                        currentLeaveCount: currentLeaveCount,
                        remainingLeaveBalance: remainingLeaveBalance,
                        usedLeaveBalance: currentLeaveCount,
                    };
                });

                setLeaveData(data);
            } catch (error) {
                console.error('Error fetching data for chart:', error);
            }
        };

        if (employeeId) {
            getData();
        }
    }, [employeeId, selectedLeaveTypeId]);

    const filteredLeaveData = selectedLeaveTypeId
        ? leaveData.filter((data) => data.leaveTypeId === selectedLeaveTypeId)
        : leaveData;

    return (
        <div className="leave-chart-container">
            <div className="chart-grid">
                {filteredLeaveData.map((data, index) => (
                    <LeaveChartComponents key={index} data={data} title={data.leaveTypeName} />
                ))}
            </div>
        </div>
    );
};

export default LeaveChart;
