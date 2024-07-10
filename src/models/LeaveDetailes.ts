// src/models/LeaveDetails.ts
export interface LeaveType {
  id: number;
  leaveTypeName: string;
  maxLeaveCount?: number;
}

export interface LeaveResponseByEmployee {
  leaveId: number;
  leaveDate: string;
  createdDate: string;
  leaveType: LeaveType; // Ensure this matches API response
  consideredDate: string;
  reason: string;
}

export interface ApprovedLeaveResponse {
  leaveId: number;
  employeeId: number;
  statusId: number;
}


//import { LeaveType } from "./LeaveTypes";

export interface LeaveDetails {
  LeaveId?: number;
  EmployeeId: number;
  LeaveTypeId: number;
  LeaveType: LeaveType;
  LeaveDate: string;
  Reason: string;
  StatusId: number;
}
export interface LeaveResponse {
  leaveId: number;
  employeeId?: number;
  leaveType: {
      leaveTypeId: number;
      leaveTypeName: string;
  };
  leaveDate: string;
  reason: string;
  createdDate: string;
}

export interface ApprovedLeaveResponse {
  leaveId: number;
  employeeId: number;
  statusId: number;
}
export interface LeaveData {
  leaveTypeId: number;
  leaveTypeName: string;
  maxLeaveCount: number;
  currentLeaveCount: number;
  remainingLeaveBalance: number;
  usedLeaveBalance: number;
}

export interface ApprovedLeaveResponse {
  leaveId: number;
  empId: number;
  empName: string;
  leaveTypeName: string;
  leaveDateStr: string;
  leaveReason: string;
  reqDateStr: string;
  appDateStr: string;
}

export  interface Leave {
  leaveId: number;
  employeeId: number;
  leaveDate: string; 
  leaveType: {
    leaveTypeName: string;
  };
  employee: {
    firstName: string;
    lastName: string;
  };
  reason: string;
  consideredDate: string;
  createdDate: string;
}

export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
}

export interface LeaveResponseByEmployee {
  leaveId: number;
  employeeId: number;
  leaveType: LeaveType;//
  createdDate: string;
  leaveDate: string;
  statusId: number;
  reason: string;
  consideredDate: string;
}

export interface LeaveDetailesforLeaveRequest{
EmployeeId : number;
LeaveTypeId: number;
LeaveDate: string;
Reason: string;
}

