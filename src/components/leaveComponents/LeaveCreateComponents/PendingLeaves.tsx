import React, { useEffect, useState } from 'react';
import { fetchPendingLeaves, deleteLeave } from '../../../services/LeaveServices';
import './PendingLeaves.css';
import { useNavigate } from 'react-router-dom';

interface Leave {
    leaveId: number;
    leaveType: {
        leaveTypeName: string;
    };
    leaveDate: string; 
    reason: string;
    createdDate: string; 
}

const PendingLeaves: React.FC = () => {
    const [leaves, setLeaves] = useState<Leave[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPendingLeaves = async () => {
            const leaveData = await fetchPendingLeaves(4); // Replace with actual employeeId
            setLeaves(leaveData);
        };
        getPendingLeaves();
    }, []);

    const handleEditClick = (leave: Leave) => {
        navigate('/edit-leave', { state: { leaveId: leave.leaveId } });
    };

    const handleDeleteClick = async (leaveId: number) => {
        const result = await deleteLeave(leaveId);
        if (result) {
            setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave.leaveId !== leaveId));
        } else {
            console.error('Failed to delete leave request.');
        }
    };

    const toggleText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return `${text.slice(0, maxLength)}...`;
    };

    const [expandedLeaveId, setExpandedLeaveId] = useState<number | null>(null);

    const toggleShowMore = (leaveId: number) => {
        if (expandedLeaveId === leaveId) {
            setExpandedLeaveId(null);
        } else {
            setExpandedLeaveId(leaveId);
        }
    };

    if (leaves.length === 0) {
        return <div>No pending leaves found.</div>;
    }

    return (
        <div className="pending-leaves-container">
            <div className='pending-leaves-header'>
                <h1>Pending Leaves</h1>
            </div>
            <div className="leaves-card-container">
                {leaves.map((leave) => (
                    <div key={leave.leaveId} className="leave-card">
                        <div className="leave-card-content">
                            <div className="leave-card-item">
                                <strong>Leave Type:</strong> {leave.leaveType.leaveTypeName}
                            </div>
                            <div className="leave-card-item">
                                <strong>Leave Date:</strong> {new Date(leave.leaveDate).toLocaleDateString()}
                            </div>
                            <div className="leave-card-item">
                                <strong>Reason:</strong> {expandedLeaveId === leave.leaveId ? leave.reason : toggleText(leave.reason, 50)}
                                {leave.reason.length > 50 && (
                                    <button className="see-more-button-pending" onClick={() => toggleShowMore(leave.leaveId)}>
                                        {expandedLeaveId === leave.leaveId ? 'Show less' : 'See more'}
                                    </button>
                                )}
                            </div>
                            <div className="leave-card-item">
                                <strong>Requested Date:</strong> {new Date(leave.createdDate).toLocaleDateString()}
                            </div>
                            <div className="pending-leaves-button-group">
                                <button
                                    onClick={() => handleEditClick(leave)}
                                    className="edit-button-pending"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(leave.leaveId)}
                                    className="delete-button-pending"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingLeaves;
