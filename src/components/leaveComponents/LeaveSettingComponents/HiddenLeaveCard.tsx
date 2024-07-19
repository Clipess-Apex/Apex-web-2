import React from 'react';
import './LeaveTypeCard.css';
import { updateLeaveTypeState } from '../../../services/LeaveTypeServices';
import { LeaveTypeCardsProps } from '../../../models/LeaveTypes';

const HiddenLeaveCards: React.FC<LeaveTypeCardsProps> = ({ leaveTypes, refreshDashboard }) => {

    const handleUnhide = async (id: number): Promise<void> => {
        const success = await updateLeaveTypeState(id, 0);
        if (success) {
            refreshDashboard();
        }
    };

    const handleDelete = async (id: number): Promise<void> => {
        const success = await updateLeaveTypeState(id, 2);
        if (success) {
            refreshDashboard();
        }
    };

    return (
        <div className='leave-type-cards-container'>
            {leaveTypes.map((leaveType) => (
                <div key={leaveType.leaveTypeId} className='leave-type-card'>
                    <h3>{leaveType.leaveTypeName}</h3>
                    <p>Max Leave Count: {leaveType.maxLeaveCount}</p>
                    <div className='buttons-container'>
                    <button className="unhideButton-leave-type" onClick={() => handleUnhide(leaveType.leaveTypeId)}>Unhide</button>
                    <button className="deleteButton-leave-type" onClick={() => handleDelete(leaveType.leaveTypeId)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HiddenLeaveCards;
