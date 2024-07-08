import React, { useState, useEffect } from 'react';
import LeaveTypeCards from '../../../components/leaveComponents/LeaveSettingComponents/LeaveTypeCard';
import AddLeaveType from '../../../components/leaveComponents/LeaveSettingComponents/AddLeaveType';
import HiddenLeaveCards from '../../../components/leaveComponents/LeaveSettingComponents/HiddenLeaveCard';
import { fetchLeaveTypes, fetchHiddenLeaveTypes } from '../../../services/LeaveTypeServices';
import { LeaveType } from '../../../models/LeaveTypes';
import './LeaveSettingsDashboard.css';  // Import your CSS

const LeaveSettingDashboard: React.FC = () => {
    const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
    const [hiddenLeaveTypes, setHiddenLeaveTypes] = useState<LeaveType[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const data: LeaveType[] = await fetchLeaveTypes();
            setLeaveTypes(data);

            const hiddenData: LeaveType[] = await fetchHiddenLeaveTypes();
            setHiddenLeaveTypes(hiddenData);
        };

        fetchData();
    }, [refresh]);

    const refreshDashboard = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="dashboard-container-leave-settings">
            <div className="dashboard-content-leave-settings">
                <h1 className="centered-heading-leave-settings">Change Leave types</h1>
                <LeaveTypeCards leaveTypes={leaveTypes} refreshDashboard={refreshDashboard} />
                <AddLeaveType />
                <HiddenLeaveCards leaveTypes={hiddenLeaveTypes} refreshDashboard={refreshDashboard} />
            </div>
        </div>
    );
};

export default LeaveSettingDashboard;