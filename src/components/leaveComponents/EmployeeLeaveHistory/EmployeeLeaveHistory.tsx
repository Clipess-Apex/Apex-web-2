import React, { useEffect, useState } from 'react';
import { fetchPastLeaves } from '../../../services/LeaveServices';
import { LeaveResponseByEmployee } from '../../../models/LeaveDetailes';
import { fetchLeaveTypes } from '../../../services/LeaveTypeServices';
import { LeaveType } from '../../../models/LeaveTypes';
import { useAuth } from '../../../providers/AuthContextProvider';
import './EmployeeLeaveHistory.css';

const EmployeeLeaveHistory: React.FC = () => {
    const { employeeId } = useAuth();
    const [pastLeaves, setPastLeaves] = useState<LeaveResponseByEmployee[]>([]);
    const [filteredLeaves, setFilteredLeaves] = useState<LeaveResponseByEmployee[]>([]);
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
    const [selectedLeaveType, setSelectedLeaveType] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedReasons, setExpandedReasons] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const fetchData = async () => {
            if (employeeId !== null) {
                try {
                    const leaves = await fetchPastLeaves(employeeId);
                    const types = await fetchLeaveTypes();

                    setPastLeaves(leaves as LeaveResponseByEmployee[]);
                    setLeaveTypes(types as LeaveType[]);
                    setFilteredLeaves(leaves as LeaveResponseByEmployee[]); // Initialize with all leaves
                } catch (error) {
                    setError('Failed to fetch data.');
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Invalid employee ID.');
                setLoading(false);
            }
        };

        fetchData();
    }, [employeeId]);

    useEffect(() => {
        let filtered = pastLeaves;

        if (selectedLeaveType) {
            filtered = filtered.filter(leave => leave.leaveType?.leaveTypeName.trim() === selectedLeaveType);
        }

        if (selectedMonth) {
            filtered = filtered.filter(leave => {
                const leaveMonth = new Date(leave.leaveDate).getMonth() + 1; // Months are 0-based in JS
                return leaveMonth.toString() === selectedMonth;
            });
        }

        setFilteredLeaves(filtered);
    }, [selectedLeaveType, selectedMonth, pastLeaves]);

    const handleLeaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLeaveType(event.target.value);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const toggleReason = (leaveId: number) => {
        setExpandedReasons(prevState => ({
            ...prevState,
            [leaveId]: !prevState[leaveId]
        }));
    };

    const truncateText = (text: string, charLimit: number) => {
        if (text.length > charLimit) {
            return {
                truncated: text.slice(0, charLimit) + '...',
                isTruncated: true
            };
        }
        return {
            truncated: text,
            isTruncated: false
        };
    };

    const handleClearFilters = () => {
        setSelectedLeaveType('');
        setSelectedMonth('');
        setFilteredLeaves(pastLeaves);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const months = [
        { value: '', label: 'All Months' },
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    return (
        <div className="leave-history-container">
            <h1>Leave History</h1>
            <div className="filter-section">
                <label htmlFor="leaveTypeFilter">Filter by Leave Type:</label>
                <select id="leaveTypeFilter" value={selectedLeaveType} onChange={handleLeaveTypeChange}>
                    <option value="">All</option>
                    {leaveTypes.map(type => (
                        <option key={type.leaveTypeId} value={type.leaveTypeName.trim()}>
                            {type.leaveTypeName.trim()}
                        </option>
                    ))}
                </select>
                <label htmlFor="monthFilter">Filter by Month:</label>
                <select id="monthFilter" value={selectedMonth} onChange={handleMonthChange}>
                    {months.map(month => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
                <button className="clear-filters-button" onClick={handleClearFilters}>
                    Clear Filters
                </button>
            </div>
            <div className="leave-card-container">
                <div className="leave-card">
                    <div className="leave-card-content">
                        <div className="leave-card-item">
                            <strong>Leave Date</strong>
                        </div>
                        <div className="leave-card-item">
                            <strong>Created Date</strong>
                        </div>
                        <div className="leave-card-item">
                            <strong>Leave Type</strong>
                        </div>
                        <div className="leave-card-item">
                            <strong>Approved Date</strong>
                        </div>
                        <div className="leave-card-item reason-item">
                            <strong>Reason</strong>
                        </div>
                    </div>
                </div>
                {filteredLeaves.length === 0 ? (
                    <div className="no-leaves-message">No past leaves found.</div>
                ) : (
                    filteredLeaves.map(leave => {
                        const { truncated, isTruncated } = truncateText(leave.reason, 50);
                        const isExpanded = expandedReasons[leave.leaveId];
                        const reasonLength = leave.reason.length;
                        const showSeeMore = isTruncated && reasonLength > 10;

                        return (
                            <div key={leave.leaveId} className="leave-card">
                                <div className="leave-card-content">
                                    <div className="leave-card-item">
                                        {new Date(leave.leaveDate).toLocaleDateString()}
                                    </div>
                                    <div className="leave-card-item">
                                        {new Date(leave.createdDate).toLocaleDateString()}
                                    </div>
                                    <div className="leave-card-item">
                                        {leave.leaveType?.leaveTypeName.trim()}
                                    </div>
                                    <div className="leave-card-item">
                                        {new Date(leave.consideredDate).toLocaleDateString()}
                                    </div>
                                    <div className="leave-card-item reason-item">
                                        {isExpanded ? leave.reason : truncated}
                                        {showSeeMore && (
                                            <span className="see-more" onClick={() => toggleReason(leave.leaveId)}>
                                                {isExpanded ? 'Show less' : 'See more'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default EmployeeLeaveHistory;
