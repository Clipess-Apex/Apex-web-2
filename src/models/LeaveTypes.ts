

// Define the LeaveType interface
export interface LeaveType {
    leaveTypeId: number;
    leaveTypeName: string;
    maxLeaveCount: number;
}

// Define the props for the HiddenLeaveCards component
export interface LeaveTypeCardsProps {
    leaveTypes: LeaveType[];
    refreshDashboard: () => void;
}

export interface LeaveTypeNameCheck {
    exists: boolean;
    hideState: number[];
}
