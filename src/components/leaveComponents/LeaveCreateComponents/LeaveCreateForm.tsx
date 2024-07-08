
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { submitLeaveRequest, getLeaveById, updateLeave, fetchCurrentLeaveCount } from '../../../services/LeaveServices';
import { fetchLeaveTypes } from '../../../services/LeaveTypeServices';
import { useNavigate, useLocation } from 'react-router-dom';
import './LeaveCreateForm.css';
import PendingLeaves from './PendingLeaves';
import { LeaveType } from '../../../models/LeaveTypes';
import { LeaveDetails, LeaveResponse } from '../../../models/LeaveDetailes';
import LeaveChart from './LeaveCreateChart';
import { createNotification } from '../../../services/LeaveNotificationServices';

const LeaveForm: React.FC = () => {
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
    const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState<string>('');
    const [leaveDate, setLeaveDate] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [leaveId, setLeaveId] = useState<number | null>(null);
    const [remainingLeaves, setRemainingLeaves] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const employeeId = 4; 
    const [formPosition, setFormPosition] = useState<'centered' | 'left'>('centered');

    useEffect(() => {
        const getLeaveTypes = async () => {
            const types = await fetchLeaveTypes();
            setLeaveTypes(types);
        };

        getLeaveTypes();

        const state = location.state as { leaveId?: number } | undefined;
        if (state && state.leaveId) {
            setIsEditMode(true);
            setLeaveId(state.leaveId);
            loadLeaveDetails(state.leaveId);
        }
    }, [location]);

    const loadLeaveDetails = async (leaveId: number) => {
        const leaveDetails = await getLeaveById(leaveId);
        if (leaveDetails) {
            setSelectedLeaveTypeId(leaveDetails.leaveType.leaveTypeId.toString());
            setLeaveDate(leaveDetails.leaveDate);
            setReason(leaveDetails.reason);
            setFormPosition('left');
        }
    };

    const handleLeaveTypeChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedTypeId = event.target.value;
        setSelectedLeaveTypeId(selectedTypeId);
        setFormPosition('left');

        if (selectedTypeId) {
            const selectedLeaveType = leaveTypes.find(
                (type) => type.leaveTypeId === parseInt(selectedTypeId, 10)
            );
            if (selectedLeaveType) {
                const currentLeaveCount = await fetchCurrentLeaveCount(employeeId, selectedLeaveType?.leaveTypeId ?? 0);
                const remainingBalance = (selectedLeaveType.maxLeaveCount ?? 0) - currentLeaveCount;
                setRemainingLeaves(remainingBalance);

                if (remainingBalance <= 0) {
                    setMessage("Sorry, you don't have enough remaining leaves.");
                } else {
                    setMessage('');
                }
            }
        } else {
            setRemainingLeaves(null);
            setMessage('');
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!selectedLeaveTypeId || !leaveDate || !reason) {
            return;
        }

        if (remainingLeaves !== null && remainingLeaves <= 0) {
            setMessage('You cannot request leave for this type because you have no remaining leave balance.');
            return;
        }

        const selectedLeaveType = leaveTypes.find(
            (type) => type.leaveTypeId === parseInt(selectedLeaveTypeId, 10)
        );

        if (!selectedLeaveType) {
            return;
        }

        const leaveDetails: LeaveDetails = {
            LeaveId: isEditMode ? (leaveId ?? undefined) : undefined,
            EmployeeId: employeeId,
            LeaveTypeId: parseInt(selectedLeaveTypeId, 10),
            LeaveType: {
                id: selectedLeaveType.leaveTypeId,
                leaveTypeName: selectedLeaveType.leaveTypeName,
                maxLeaveCount: selectedLeaveType.maxLeaveCount ?? 0,
            },
            LeaveDate: leaveDate,
            Reason: reason,
            StatusId: 1
        };

        let result: LeaveResponse | undefined;
        if (isEditMode) {
            const updateResult = await updateLeave(leaveId!, leaveDetails);
            result = updateResult ?? undefined;
        } else {
            const submitResult = await submitLeaveRequest(leaveDetails);
            result = submitResult ?? undefined;
            if (result) {
                const currentDateTime = new Date().toISOString();
                const notificationData = {
                    EmployeeId: employeeId!,
                    LeaveId: result.leaveId,
                    Message: `New leave request from Employee ${employeeId} for ${selectedLeaveType.leaveTypeName} on ${leaveDate}. Requested on ${currentDateTime}`,
                    ManagerId: 1,
                    CreatedAt: currentDateTime
                };
                await createNotification(notificationData);
            }
        }

        if (result) {
            setMessage(isEditMode ? 'Leave updated successfully.' : 'Leave request submitted.');
            setTimeout(() => {
                navigate('/pending-leaves');
            }, 500);
        } else {
            console.error('Failed to submit leave request.');
        }
    };

    return (
        <div>
            <div className={`leave-form-chart-container ${formPosition}`}>
                <div className="leave-form-section">
                    <div className='leave-Request-Header'>
                    <h1>{isEditMode ? 'Edit Leave Request' : 'Request for Leaves'}</h1>
                    </div>
                    <form className="leave-form" onSubmit={handleSubmit}>
                        <label>
                            Leave Type:
                            <select
                                value={selectedLeaveTypeId}
                                onChange={handleLeaveTypeChange}
                                required
                            >
                                <option value="">Select Type</option>
                                {leaveTypes.map((type) => (
                                    <option key={type.leaveTypeId} value={type.leaveTypeId}>
                                        {type.leaveTypeName}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Leave Date:
                            <input
                                type="date"
                                value={leaveDate}
                                onChange={(e) => setLeaveDate(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Reason:
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">{isEditMode ? 'Update' : 'Submit'}</button>
                    </form>
                    {message && <p className='leave-form-error-message'>{message}</p>}
                </div>
                {selectedLeaveTypeId && (
                    <LeaveChart selectedLeaveTypeId={parseInt(selectedLeaveTypeId)} employeeId={employeeId} />
                )}
            </div>
            <div className='pending-leave-section'>
                <PendingLeaves />
            </div>
        </div>
    );
};

export default LeaveForm;
