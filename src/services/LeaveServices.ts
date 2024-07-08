import { LeaveDetailesforLeaveRequest, LeaveResponseByEmployee } from "../models/LeaveDetailes"; 
import { LeaveDetails,  LeaveResponse} from "../models/LeaveDetailes";

export const fetchPastLeaves = async (employeeId: number, statusId = 2): Promise<LeaveResponseByEmployee[]> => {
    try {
        const response = await fetch(`https://localhost:7166/api/leave/pastLeaves?employeeId=${employeeId}&statusId=${statusId}`);
        if (response.ok) {
            return await response.json() as LeaveResponseByEmployee[];
        } else {
            console.error('Failed to fetch past leaves.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching past leaves:', error);
        return [];
    }
};

// LeaveServices.ts

// src/services/LeaveServices.ts
export interface Employee {
    employeeID: number;
    firstName: string;
    lastName: string;
    // Other properties as required
}

export interface LeaveType {
    leaveTypeId: number;
    leaveTypeName: string;
    // Other properties as required
}

export interface Leave {
    leaveId: number;
    employee: Employee;
    leaveType: LeaveType;
    createdDate: string;
    leaveDate: string;
    consideredDate: string;
    reason: string;
    expanded?: boolean;
}

export const fetchApprovedLeaves = async (statusId: number): Promise<Leave[]> => {
    try {
        const response = await fetch(`https://localhost:7166/api/leave/leave?statusId=${statusId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch approved leaves.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching approved leaves:', error);
        return [];
    }
};

const API_BASE_URL = `https://localhost:7166/api/leave`;

// For creating new leave requests
export const submitLeaveRequest = async (leaveDetails: LeaveDetailesforLeaveRequest): Promise<LeaveResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/AddLeaveDetailes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaveDetails),
        });

        if (response.ok) {
            return await response.json() as LeaveResponse;
        } else {
            console.error('Failed to submit leave request.');
            return null;
        }
    } catch (error) {
        console.error('Error submitting leave request:', error);
        return null;
    }
};

// For fetching pending leave requests by employee ID and status ID
export const fetchPendingLeaves = async (employeeId: number, statusId = 1): Promise<LeaveResponse[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/pastLeaves?statusId=${statusId}&employeeId=${employeeId}`);
        if (response.ok) {
            return await response.json() as LeaveResponse[];
        } else {
            console.error('Failed to fetch pending leaves.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching pending leaves:', error);
        return [];
    }
};

// For updating leave requests
export const updateLeave = async (leaveId: number, leaveData: LeaveDetails): Promise<LeaveResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/updateLeave/${leaveId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaveData),
        });

        if (response.ok) {
            return await response.json() as LeaveResponse;
        } else {
            console.error('Failed to update leave.');
            return null;
        }
    } catch (error) {
        console.error('Error updating leave:', error);
        return null;
    }
};

// For getting leave details by ID
export const getLeaveById = async (leaveId: number): Promise<LeaveResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/getLeaveById/${leaveId}`);
        if (response.ok) {
            return await response.json() as LeaveResponse;
        } else {
            console.error('Failed to fetch leave by ID.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching leave by ID:', error);
        return null;
    }
};

// For deleting pending leave requests
export const deleteLeave = async (leaveId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/deleteLeave/${leaveId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return true;
        } else {
            console.error('Failed to delete leave request.');
            return false;
        }
    } catch (error) {
        console.error('Error deleting leave request:', error);
        return false;
    }
};



export const fetchCurrentLeaveCount = async (employeeId: number, leaveTypeId: number): Promise<number> => {
    try {
        const response = await fetch(`${API_BASE_URL}/leaveCounts?employeeId=${employeeId}&leaveTypeId=${leaveTypeId}`);
        if (response.ok) {
            const data = await response.json();
            console.log(`API response data for leaveTypeId ${leaveTypeId}:`, data); // Log the entire API response data

            const count = data;
            console.log(`Fetched leave count for leaveTypeId ${leaveTypeId}:`, count);

            return count;
        } else {
            console.error(`Failed to fetch current leave count. Status: ${response.status}, Status Text: ${response.statusText}`);
            return 0;  // Fallback to a default value
        }
    } catch (error) {
        console.error('Error fetching current leave count:', error);
        return 0;  // Fallback to a default value
    }
};









