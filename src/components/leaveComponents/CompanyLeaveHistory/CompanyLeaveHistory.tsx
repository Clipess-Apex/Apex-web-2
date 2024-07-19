import React, { useState, useEffect } from 'react';
import { fetchApprovedLeaves, Leave, LeaveType } from '../../../services/LeaveServices';
import { fetchLeaveTypes } from '../../../services/LeaveTypeServices';
import './CompanyLeaveHistory.css';

const CompanyLeaveHistory: React.FC = () => {
    const [leaves, setLeaves] = useState<Leave[]>([]);
    const [leaveTypes, setLeaveTypes] = useState<string[]>([]);
    const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const statusId = 2; // Assuming statusId for approved leaves is 2
            try {
                const result = await fetchApprovedLeaves(statusId);
                setLeaves(result);
            } catch (error) {
                setError('Failed to fetch approved leaves.');
                console.error('Error fetching data:', error);
            }
        };

        const fetchLeaveTypesData = async () => {
            try {
                const types: LeaveType[] = await fetchLeaveTypes();
                const typeNames = types.map(type => type.leaveTypeName.trim());
                setLeaveTypes(typeNames);
            } catch (error) {
                console.error('Error fetching leave types:', error);
            }
        };

        fetchData();
        fetchLeaveTypesData();
    }, []);

    const handleLeaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLeaveType(event.target.value === 'all' ? null : event.target.value);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value === 'all' ? null : parseInt(event.target.value));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? parseInt(event.target.value) : null;
        if (value === null || (value >= 1 && value <= 31)) {
            setSelectedDate(value);
        }
    };

    const handleEmployeeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEmployeeName(event.target.value);
    };

    const toggleExpand = (leaveId: number) => {
        setLeaves(prevLeaves =>
            prevLeaves.map(leave =>
                leave.leaveId === leaveId ? { ...leave, expanded: !leave.expanded } : leave
            )
        );
    };

    const filteredLeaves = leaves.filter((leave) => {
        if (selectedLeaveType && leave.leaveType.leaveTypeName.trim() !== selectedLeaveType) {
            return false;
        }
        if (selectedMonth !== null && new Date(leave.leaveDate).getMonth() !== selectedMonth - 1) {
            return false;
        }
        if (selectedDate !== null && new Date(leave.leaveDate).getDate() !== selectedDate) {
            return false;
        }
        if (
            selectedEmployeeName &&
            `${leave.employee.firstName} ${leave.employee.lastName}`
                .toLowerCase()
                .indexOf(selectedEmployeeName.toLowerCase()) === -1
        ) {
            return false;
        }
        return true;
    });

    return (
        <div className="company-leave-history-container">
            <h1>Approved Leaves</h1>
            {error && <p className="company-leave-history-error-message">{error}</p>}
            {leaveTypes.length > 0 && (
                <div className="company-leave-history-filter-section">
                    <div className="company-leave-history-filter-item">
                        <label htmlFor="leaveTypeFilter">Filter by Leave Type:</label>
                        <select
                            id="leaveTypeFilter"
                            onChange={handleLeaveTypeChange}
                            value={selectedLeaveType || 'all'}
                        >
                            <option value="all">All</option>
                            {leaveTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="company-leave-history-filter-item">
                        <label htmlFor="monthFilter">Filter by Month:</label>
                        <select
                            id="monthFilter"
                            onChange={handleMonthChange}
                            value={selectedMonth || 'all'}
                        >
                            <option value="all">All</option>
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>
                    </div>
                    <div className="company-leave-history-filter-item">
                        <label htmlFor="dateFilter">Filter by Date:</label>
                        <input
                            type="number"
                            id="dateFilter"
                            placeholder="Enter date (1-31)"
                            value={selectedDate || ''}
                            onChange={handleDateChange}
                            min={1}
                            max={31}
                        />
                    </div>
                    <div className="company-leave-history-filter-item">
                        <label htmlFor="employeeNameFilter">Filter by Employee Name:</label>
                        <input
                            type="text"
                            id="employeeNameFilter"
                            placeholder="Enter employee name"
                            value={selectedEmployeeName}
                            onChange={handleEmployeeNameChange}
                        />
                    </div>
                </div>
            )}

            {filteredLeaves.length === 0 ? (
                <p className="company-leave-history-no-leaves-message">No approved leaves found.</p>
            ) : (
                <>
                    <div className="company-leave-history-column-names-container">
                        <div className="company-leave-history-leave-card-item">Employee Name</div>
                        <div className="company-leave-history-leave-card-item company-leave-history-leave-type-column">Leave Type</div>
                        <div className="company-leave-history-leave-card-item">Leave Date</div>
                        <div className="company-leave-history-leave-card-item">Reason</div>
                    </div>
                    <div className="company-leave-history-leave-card-container">
                        {filteredLeaves.map((leave) => (
                            <div key={leave.leaveId} className="company-leave-history-leave-card">
                                <div className="company-leave-history-leave-card-content">
                                    <div className="company-leave-history-leave-card-item">
                                        {leave.employee.firstName} {leave.employee.lastName}
                                    </div>
                                    <div className="company-leave-history-leave-card-item">
                                        {leave.leaveType.leaveTypeName}
                                    </div>
                                    <div className="company-leave-history-leave-card-item">
                                        {new Date(leave.leaveDate).toLocaleDateString()}
                                    </div>
                                    <div className="company-leave-history-leave-card-item company-leave-history-reason-item">
                                        {leave.expanded
                                            ? leave.reason
                                            : leave.reason.length > 50
                                            ? `${leave.reason.substring(0, 50)}...`
                                            : leave.reason}
                                        {leave.reason.length > 50 && (
                                            <span
                                                className="company-leave-history-see-more"
                                                onClick={() => toggleExpand(leave.leaveId)}
                                            >
                                                {leave.expanded ? 'See less' : 'See more'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CompanyLeaveHistory;
