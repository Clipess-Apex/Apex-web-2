import { Leave } from "../../../models/LeaveDetailes";

const aggregateLeaveData = (leaves: Leave[]) => {
    const leaveCountsByMonth: Record<string, Record<string, number>> = {}; // month -> employee -> count

    leaves.forEach((leave) => {
        const leaveDate = new Date(leave.leaveDate);
        const monthYear = `${leaveDate.getMonth() + 1}/${leaveDate.getFullYear()}`;
        const employeeName = `${leave.employee.firstName} ${leave.employee.lastName}`;

        if (!leaveCountsByMonth[monthYear]) {
            leaveCountsByMonth[monthYear] = {};
        }

        if (!leaveCountsByMonth[monthYear][employeeName]) {
            leaveCountsByMonth[monthYear][employeeName] = 0;
        }

        leaveCountsByMonth[monthYear][employeeName]++;
    });

    return leaveCountsByMonth;
};
