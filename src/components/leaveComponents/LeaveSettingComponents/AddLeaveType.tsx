import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddLeaveType.css';

const AddLeaveType: React.FC = () => {
    const navigate = useNavigate();
    const handleCardClick = (): void => {
        navigate('/create-leave-type');
    };

    return (
        <div className="add-leave-type-card" onClick={handleCardClick}>
            <h2>Create New Leave Type</h2>
        </div>
    );
};

export default AddLeaveType;
