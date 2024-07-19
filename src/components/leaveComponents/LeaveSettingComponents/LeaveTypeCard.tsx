import React from 'react';
import './LeaveTypeCard.css';
import { useNavigate } from 'react-router-dom';
import { updateLeaveTypeState } from '../../../services/LeaveTypeServices';
import { LeaveType, LeaveTypeCardsProps } from '../../../models/LeaveTypes';

const LeaveTypeCards: React.FC<LeaveTypeCardsProps> = ({ leaveTypes, refreshDashboard }) => {
    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        console.log(`Edit leave type with ID: ${id}`);
        navigate(`/edit-leave-type/${id}`);
    };

    const handleHide = async (id: number): Promise<void> => {
        console.log(`Hide leave type with ID: ${id}`);
        const success = await updateLeaveTypeState(id, 1);
        if (success) {
            refreshDashboard();
        }
    };

    const handleDelete = async (id: number): Promise<void> => {
        console.log(`Delete leave type with ID: ${id}`);
        const success = await updateLeaveTypeState(id, 2);
        if (success) {
            refreshDashboard();
        }
    };

    return (
        <div className="leave-type-cards-container">
            {leaveTypes.map((leaveType: LeaveType) => (
                <div key={leaveType.leaveTypeId} className="leave-type-card">
                    <h3>{leaveType.leaveTypeName}</h3>
                    <p>Max Leave Count: {leaveType.maxLeaveCount}</p>
                    <div className="buttons-container-leave-type">
                    <button className="editButton-leave-type" onClick={() => handleEdit(leaveType.leaveTypeId)}>Edit</button>
                    <button className="hideButton-leave-type" onClick={() => handleHide(leaveType.leaveTypeId)}>Hide</button>
                    <button className="deleteButton-leave-type" onClick={() => handleDelete(leaveType.leaveTypeId)}>Delete</button>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeaveTypeCards;
