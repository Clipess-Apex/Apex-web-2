import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLeaveTypeById, checkLeaveTypeName, addLeaveType, editLeaveType } from '../../../services/LeaveTypeServices';
import { LeaveType, LeaveTypeNameCheck } from '../../../models/LeaveTypes';
import './LeaveTypeForm.css';

const LeaveTypeForm: React.FC = () => {
    const [leaveTypeName, setLeaveTypeName] = useState<string>('');
    const [maxLeaveCount, setMaxLeaveCount] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(true); // State to control popup display
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchLeaveType = async () => {
            if (id) {
                const data: LeaveType | null = await fetchLeaveTypeById(parseInt(id));
                if (data) {
                    setLeaveTypeName(data.leaveTypeName);
                    setMaxLeaveCount(data.maxLeaveCount.toString());
                }
            }
        };
        fetchLeaveType();
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (maxLeaveCount === '' || parseInt(maxLeaveCount) < 1) {
            setErrorMessage('Max Leave Count is required.');
            return;
        }

        if (parseInt(maxLeaveCount) > 30) {
            setErrorMessage('The maximum number of days for one type of leave is 30.');
            return;
        }

        const leaveTypeCheck: LeaveTypeNameCheck = await checkLeaveTypeName(leaveTypeName);
        if (!id && leaveTypeCheck.exists) {
            if (Array.isArray(leaveTypeCheck.hideState)) {
                if (leaveTypeCheck.hideState.includes(0) || leaveTypeCheck.hideState.includes(1)) {
                    setErrorMessage('A leave type with this name already exists.');
                    return;
                }
            }
        }

        const leaveType: LeaveType = {
            leaveTypeId: id ? Number(id) : 0,
            leaveTypeName,
            maxLeaveCount: parseInt(maxLeaveCount),
        };

        const success: boolean = id
            ? await editLeaveType(parseInt(id), leaveType)
            : await addLeaveType(leaveType);

        if (success) {
            navigate('/leave-settings');
        } else {
            setErrorMessage('Failed to save leave type.');
        }
    };

    const handleCancel = () => {
        navigate('/leave-settings');
    };

    const closePopup = () => {
        setShowPopup(false); // This would close the popup
    };

    // Return null if showPopup is false
    if (!showPopup) {
        return null;
    }

    // Return the form JSX otherwise
    return (
        <div className="popup-container">
            <div className="leave-type-form-container">
                <form onSubmit={handleSubmit} className="leave-type-form">
                    <div className="form-group-leave-type">
                        <label htmlFor="leaveTypeName">Leave Type Name</label>
                        <input
                            type="text"
                            id="leaveTypeName"
                            value={leaveTypeName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLeaveTypeName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-leave-type">
                        <label htmlFor="maxLeaveCount">Max Leave Count</label>
                        <input
                            type="number"
                            id="maxLeaveCount"
                            value={maxLeaveCount}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxLeaveCount(e.target.value)}
                            required={!id}
                        />
                        {errorMessage && <p className="error-message-leave-type">{errorMessage}</p>}
                    </div>
                    <div className="form-buttons-leave-type">
                        <button type="submit">{id ? 'Edit Leave Type' : 'Add Leave Type'}</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className="popup-background" onClick={closePopup}></div>
        </div>
    );
};

export default LeaveTypeForm;
