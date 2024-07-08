import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import ManagerMonthlyRecord from './ManagerMonthlyRecord';
import '../../../styles/timeEntry/ManagerRecords/ManagerMonthlyCalendar.css'
import calendarIcon from '../../../icons/timeEntry/CalendarIcon.svg'
import {TimeEntryCalendar  } from '../common/CalendarStyledComponents'

const ManagerMonthlyCalendar = () => {

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
            <div className="MagMonthlyCal">
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
            <ManagerMonthlyRecord monthProp={month} />
        </>
    )
}

export default ManagerMonthlyCalendar