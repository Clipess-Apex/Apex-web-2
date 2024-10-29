import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import calendarIcon from '../../../icons/timeEntry/CalendarIcon.svg'
import EmployeePdfViewer from './EmployeePdfViewer';
import '../../../styles/timeEntry/EmployeeRecords/EmployeePdfViewerCalendar.css'
import {TimeEntryCalendar } from '../common/CalendarStyledComponents'

const EmployeePdfViewerCalendar = () => {

    const [month, setMonth] = useState<string | undefined>();
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const handleMonthClick = (month: Date) => {
        const selectedYear = month.getFullYear();
        const selectedMonth = (month.getMonth() + 1).toString().padStart(2, '0');
        const formattedDate = `${selectedYear}-${selectedMonth}`;
        setOpenCalendar(false);
        setMonth(formattedDate);
    };

    const handleClick = () => {
        setOpenCalendar((prev) => !prev);
    };

    const monthString = month ? format(new Date(month + '-01'), 'MMMM yyyy') : 'Select a Month';

    return (
        <>
            <div className="EmpPdfViewerCal">
                <div className="textContainer" onClick={handleClick}>
                    {month ? (monthString) : ('Select a Month')}
                    <img src={calendarIcon} alt="Calendar" style={{ marginRight: '8px' }} />
                </div>

                {openCalendar && (
                    <TimeEntryCalendar>
                    <Calendar
                        view='year'
                        className='monthRange'
                        onClickMonth={handleMonthClick}
                    />
                    </TimeEntryCalendar>
                )}
            </div>
            <EmployeePdfViewer monthProp={month} />
        </>
    )
}

export default EmployeePdfViewerCalendar