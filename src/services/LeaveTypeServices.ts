// src/services/LeaveTypeService.ts
import { LeaveType, LeaveTypeNameCheck } from "../models/LeaveTypes";

const API_BASE_URL = 'https://localhost:7166/api/leaveType';

// Get leave type data in unhidden leave types
export const fetchLeaveTypes = async (): Promise<LeaveType[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/leaveType`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch leave types.');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const fetchHiddenLeaveTypes = async (): Promise<LeaveType[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/HiddenLeaveTypes`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch hidden leave types.');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const updateLeaveTypeState = async (id: number, hideState: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/UpdateHideState/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ HideState: hideState }),
        });
        if (response.ok) {
            return true;
        } else {
            console.error(`Failed to update leave type state for ID: ${id}`);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export const fetchLeaveTypeById = async (id: number): Promise<LeaveType | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/GetLeaveTypeById/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch leave type.');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const checkLeaveTypeName = async (name: string): Promise<LeaveTypeNameCheck> => {
    try {
        const response = await fetch(`${API_BASE_URL}/CheckLeaveTypeName/${name}`);
        if (response.ok) {
            const data: LeaveTypeNameCheck = await response.json();
            if (data.hideState && !Array.isArray(data.hideState)) {
                data.hideState = [data.hideState];
            }
            return data;
        } else {
            console.error('Failed to check leave type name.');
            return { exists: false, hideState: [] };
        }
    } catch (error) {
        console.error('Error:', error);
        return { exists: false, hideState: [] };
    }
};

export const addLeaveType = async (leaveType: LeaveType): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/AddLeaveTypes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaveType),
        });
        return response.ok;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export const editLeaveType = async (id: number, leaveType: LeaveType): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/EditLeaveTypes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaveType),
        });
        return response.ok;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};
